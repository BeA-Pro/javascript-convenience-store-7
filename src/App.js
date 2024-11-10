import fs from 'fs/promises';
import splitter from './utils/splitter.js';

class App {
  #inventoryInfo;
  #promotionInfo;
  async run() {
    this.#intiate();
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
    this.#inventoryInfo = products.reduce((acc, product) => {
      const [name, quantity, price, promotion] = splitter(product, ',');
      acc.push({ name, quantity, price, promotion });
      return acc;
    }, []);
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
    this.#promotionInfo = promotions.reduce((acc, promotion) => {
      const [name, buy, get, startDate, endDate] = splitter(promotion, ',');
      acc.push({ name, buy: Number(buy), get: Number(get), startDate, endDate });
      return acc;
    }, []);
  }
}

export default App;
