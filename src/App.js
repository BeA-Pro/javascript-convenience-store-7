import fs from 'fs';
import splitter from './utils/splitter.js';

class App {
  #inventoryInfo;
  #promotionInfo;
  async run() {
    await this.#intiate();
  }

  async #intiate() {
    await this.#getProductInfoFromMd();
  }

  async #getProductInfoFromMd() {
    // 파일을 비동기적으로 읽어오는 함수
    fs.readFile('./public/products.md', 'utf8', (err, data) => {
      if (err) throw new Error('[ERROR] 상품 정보를 불러오는 도중 에러가 발생하였습니다.');

      const products = splitter(data, '\n').slice(1, -1);
      if (products.length === 0) throw new Error('[ERROR] 상품 정보가 존재하지 않습니다.');

      this.#addInventory(products);
    });
  }

  #addInventory(products) {
    this.#inventoryInfo = products.reduce((acc, product) => {
      const [name, quantity, price, promotion] = product.split(',');
      acc.push({ name, quantity, price, promotion });
      return acc;
    }, []);
  }
}

export default App;
