import fs from 'fs/promises';
import splitter from './utils/splitter.js';
import Validate from './utils/validate.js';
import OutputView from './views/output.js';
import InputView from './views/input.js';

class App {
  #inventoryInfo;
  #promotionInfo;

  async run() {
    await this.#intiate();
    OutputView.printProducts(this.#inventoryInfo);
    const buyInfo = await InputView.buyInfo();
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
    const strInfo = products.reduce((acc, product) => {
      const [name, quantity, price, promotion] = splitter(product, ',');
      acc.push({ name, quantity, price, promotion });
      return acc;
    }, []);
    this.#validateAndChangeStrToProductType(strInfo);
  }

  #validateAndChangeStrToProductType(strInfo) {
    this.#inventoryInfo = strInfo.reduce((acc, strProduct) => {
      Validate.product(strProduct);
      acc.push({
        name: strProduct.name, quantity: Number(strProduct.quantity), price: Number(strProduct.price), promotion: strProduct.promotion,
      });
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
    const strInfo = promotions.reduce((acc, promotion) => {
      const [name, buy, get, startDate, endDate] = splitter(promotion, ',');
      acc.push({ name, buy: Number(buy), get: Number(get), startDate, endDate });
      return acc;
    }, []);
    this.#validateAndChangeStrToPromotionType(strInfo);
  }

  #validateAndChangeStrToPromotionType(strInfo) {
    this.#promotionInfo = strInfo.reduce((acc, strPro) => {
      Validate.promotion(strPro);
      const endDate = new Date(strPro.endDate);
      endDate.setDate(endDate.getDate() + 1);
      acc.push({ name: strPro.name, buy: Number(strPro.buy), get: Number(strPro.get), startDate: new Date(strPro.startDate), endDate });
      return acc;
    }, []);
  };
}

export default App;
