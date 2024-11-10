import fs from 'fs/promises';
import splitter from './utils/splitter.js';
import Validate from './utils/validate.js';
import OutputView from './views/output.js';
import InputView from './views/input.js';
import InformationController from './controllers/InformationController.js';
import CheckController from './controllers/CheckController.js';
import BuyController from './controllers/BuyController.js';

class App {
  #informationController;
  #checkController;
  #buyController;
  constructor() {
    this.#informationController = new InformationController();
    this.#checkController = new CheckController(this.#informationController);
    this.#buyController = new BuyController(this.#informationController);
  }

  async run() {
    await this.#addDatas();

    OutputView.printProducts(this.#informationController.getInventory());
    const buyInfo = await InputView.readBuyInfo();
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
      const [name, quantity, price, promotion] = splitter(product, ',');
      this.#informationController.addProduct({ name, quantity, price, promotion });
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
}

export default App;
