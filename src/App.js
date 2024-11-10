import fs from 'fs/promises';
import splitter from './utils/splitter.js';
import Validate from './utils/validate.js';
import OutputView from './views/output.js';
import InputView from './views/input.js';
import InventoryModel from './models/InventoryModel.js';
import PromotionModel from './models/PromotionModel.js';

class App {
  #inventoryModel;
  #promotionModel;

  constructor() {
    this.#inventoryModel = new InventoryModel();
    this.#promotionModel = new PromotionModel();
  }

  async run() {
    await this.#intiate();
    OutputView.printProducts(this.#inventoryModel.getInventory());
    const buyInfo = await InputView.readBuyInfo();
  }

  async #intiate() {
    await this.#getProductInfoFromMd();
    await this.#getPromotionInfoFromMd();
  }

  async #getProductInfoFromMd() {
    try {
      const data = await fs.readFile('./public/products.md', 'utf8');
      const products = splitter(data, '\n').slice(1, -1);

      if (products.length === 0) throw new Error('[ERROR] 상품 정보가 존재하지 않습니다.');

      this.#addInventory(products);
    } catch (err) {
      throw new Error(`[ERROR] 상품 정보를 불러오는 도중 에러가 발생하였습니다: ${err.message}`);
    }
  }

  #addInventory(products) {
    products.forEach((product) => {
      const [name, quantity, price, promotion] = splitter(product, ',');
      Validate.product({ name, quantity, price, promotion });
      this.#inventoryModel.addProduct({
        name, quantity: Number(quantity), price: Number(price), promotion,
      });
    });
  }

  async #getPromotionInfoFromMd() {
    try {
      const data = await fs.readFile('./public/promotions.md', 'utf8');
      const promotions = splitter(data, '\n').slice(1, -1);

      this.#addPromotion(promotions);
    } catch (err) {
      throw new Error(`[ERROR] 프로모션 정보를 불러오는 도중 에러가 발생하였습니다: ${err.message}`);
    }
  }

  #addPromotion(promotions) {
    promotions.forEach((promotion) => {
      const [name, buy, get, startDate, endDate] = splitter(promotion, ',');
      Validate.promotion({ name, buy, get, startDate, endDate });
      const realEndDate = new Date(endDate);
      realEndDate.setDate(realEndDate.getDate() + 1);
      this.#promotionModel.addPromotion({ name, buy: Number(buy), get: Number(get), startDate: new Date(startDate), realEndDate });
    });
  }
}

export default App;
