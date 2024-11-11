import fs from 'fs/promises';
import splitter from './utils/splitter.js';
import OutputView from './views/output.js';
import InputView from './views/input.js';
import InformationController from './controllers/InformationController.js';
import CheckController from './controllers/CheckController.js';
import BuyController from './controllers/BuyController.js';

class App {
  #informationController;
  #checkController;
  #buyController;
  #YES = 'Y';
  #NO = 'N';
  constructor() {
    this.#informationController = new InformationController();
    this.#checkController = new CheckController(this.#informationController);
    this.#buyController = new BuyController(this.#informationController);
  }

  async run() {
    await this.#addDatas();
    OutputView.printProducts(this.#informationController.getInventory());
    const orders = splitter(await InputView.readOrder(), ',');
    const buyList = await this.#getBuyList(orders);
    const membership = await this.#isMembership();
    const getReceiptInfo = this.#buyController.run(buyList, membership);
  }

  async #addDatas() {
    await this.#getProductInfoFromMd();
    await this.#getPromotionInfoFromMd();
  }

  async #getProductInfoFromMd() {
    try {
      const data = await fs.readFile('./public/products.md', 'utf8');
      const products = splitter(data, '\n').slice(1, -1);

      if (products.length === 0) throw new Error('[ERROR] 상품 정보가 존재하지 않습니다.');

      this.#addProducts(products);
    } catch (err) {
      throw new Error(`[ERROR] 상품 정보를 불러오는 도중 에러가 발생하였습니다: ${err.message}`);
    }
  }

  #addProducts(products) {
    products.forEach((product) => {
      const [name, price, quantity, promotion] = splitter(product, ',');
      this.#informationController.addProduct({ name, price, quantity, promotion });
    });
  }

  async #getPromotionInfoFromMd() {
    try {
      const data = await fs.readFile('./public/promotions.md', 'utf8');
      const promotions = splitter(data, '\n').slice(1, -1);
      this.#addPromotions(promotions);
    } catch (err) {
      throw new Error(`[ERROR] 프로모션 정보를 불러오는 도중 에러가 발생하였습니다: ${err.message}`);
    }
  }

  #addPromotions(promotions) {
    promotions.forEach((promotion) => {
      const [name, buy, get, startDate, endDate] = splitter(promotion, ',');
      this.#informationController.addPromotion({ name, buy, get, startDate, endDate });
    });
  }

  async #getBuyList(orders) {
    const list = [];
    for (const order of orders) {
      const buyInfo = await this.#addBuyInfo(order);
      if (buyInfo) list.push(buyInfo);
    }
    return list;
  }
  async #addBuyInfo(order) {
    const [name, defaultCnt, promoCnt, giftCnt, canGiftCnt, notPromoCnt, isPromotion] = this.#checkController.checkOrder(order);
    let canGiftCnt2 = canGiftCnt;
    if (isPromotion) {
      const [notBuy, getGift] = await this.#resolvePromotionCase(name, notPromoCnt, canGiftCnt);
      if (notBuy) return null;
      if (!getGift) canGiftCnt2 = 0;
    }
    return { name, defaultCnt, promoCnt, giftCnt, canGift: canGiftCnt2, notPromoCnt, isPromotion };
  }

  async #resolvePromotionCase(name, notPromoCnt, canGiftCnt) {
    let notBuy = false;
    let getGift = false;
    // 정가 구매 제안하는 경우
    if (notPromoCnt > 0) notBuy = await this.#getSuggestBuyAnswer(name, notPromoCnt);
    else if (canGiftCnt > 0) getGift = await this.#getSuggestGiftAnswer(name, canGiftCnt);
    return [notBuy, getGift];
  }

  async #getSuggestBuyAnswer(name, notPromoCnt) {
    const answer = await InputView.suggestBuy(name, notPromoCnt);
    if (answer !== this.#YES && answer !== this.#NO) throw new Error('[ERROR] Y와 N으로만 응답하여 주세요');
    if (answer === this.#YES) return false;
    return true;
  }
  async #getSuggestGiftAnswer(name, canGiftCnt) {
    const answer = await InputView.suggestGift(name, canGiftCnt);
    if (answer !== this.#YES && answer !== this.#NO) throw new Error('[ERROR] Y와 N으로만 응답하여 주세요');
    if (answer === this.#NO) return false;
    return true;
  }

  async #isMembership() {
    const answer = await InputView.suggestMembership();
    if (answer !== this.#YES && answer !== this.#NO) throw new Error('[ERROR] Y와 N으로만 응답하여 주세요');
    if (answer === this.#NO) return false;
    return true;
  }
}

export default App;
