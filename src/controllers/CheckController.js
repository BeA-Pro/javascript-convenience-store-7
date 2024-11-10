import Validate from '../utils/validate.js';
import splitter from '../utils/splitter.js';
import { DateTimes } from '@woowacourse/mission-utils';

class CheckController {
  #inventoryModel;
  constructor(inventoryModel) {
    this.#inventoryModel = inventoryModel;
  }

  checkOrder(order) {
    Validate.order(order);
    const splitOrder = splitter(order.slice(1, -1), '-');
    const [name, quantity] = [splitOrder.at(0), Number(splitOrder.at(1))];
    if (!this.#checkProductName(name)) throw new Error(`[ERROR] ${name}은 존재하지 않는 상품입니다.\n`);

    const defaultCnt = this.#getDefaultProductInventory(name);
    const [buy, get, promoCnt, isPromotion] = this.#getPromotionProductInventory(name);
  }

  #checkProductName(name) {
    return this.#inventoryModel.getInventory()
      .some((data) => data.name === name);
  }

  #getDefaultProductInventory(name) {
    const defaultProduct = this.#inventoryModel.getInventory()
      .find((data) => data.name === name && data.promotion === 'null');
    if (defaultProduct === undefined) return 0;
    return defaultProduct.quantity;
  }

  #getPromotionProductInventory(name) {
    const promoProduct = this.#inventoryModel.getInventory()
      .find((data) => data.name === name && data.promotion !== 'null');
    if (promoProduct === undefined) return [0, 0, 0, false];
    const [buy, get, isPromotion] = this.#checkPromotionPeriod(promoProduct.promotion);
    return [buy, get, promoProduct.quantity, isPromotion];
  }

  #checkPromotionPeriod(promotion) {
    const promoInfo = this.#inventoryModel.getPromotion()
      .find((data) => data.name === promotion);

    if (promoInfo === undefined) return [0, 0, false];

    const now = DateTimes.now();
    if (now < promoInfo.startDate || now > promoInfo.endDate) return [0, 0, false];
    return [promoInfo.buy, promoInfo.get, true];
  }
}

export default CheckController;
