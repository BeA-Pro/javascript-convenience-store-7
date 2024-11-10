import InventoryModel from '../models/InventoryModel.js';
import PromotionModel from '../models/PromotionModel.js';
import Validate from '../utils/validate.js';

class InformationController {
  #inventoryModel;
  #promotionModel;

  constructor() {
    this.#inventoryModel = new InventoryModel();
    this.#promotionModel = new PromotionModel();
  };

  addProduct({ name, price, quantity, promotion }) {
    Validate.product({ name, price, quantity, promotion });
    this.#inventoryModel.addProduct({
      name, price: Number(price), quantity: Number(quantity), promotion,
    });
  }

  addPromotion({ name, buy, get, startDate, endDate }) {
    Validate.promotion({ name, buy, get, startDate, endDate });
    const realEndDate = new Date(endDate);
    realEndDate.setDate(realEndDate.getDate() + 1);
    this.#promotionModel.addPromotion({ name, buy: Number(buy), get: Number(get), startDate: new Date(startDate), endDate: realEndDate });
  }

  getInventory() {
    return this.#inventoryModel.getInventory();
  }

  getPromotion() {
    return this.#promotionModel.getPromotions();
  }
}

export default InformationController;
