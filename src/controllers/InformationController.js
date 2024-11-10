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

  addProduct({ name, quantity, price, promotion }) {
    Validate.product({ name, quantity, price, promotion });
    this.#inventoryModel.addProduct({
      name, quantity: Number(quantity), price: Number(price), promotion,
    });
  }

  addPromotion({ name, buy, get, startDate, endDate }) {
    Validate.promotion({ name, buy, get, startDate, endDate });
    const realEndDate = new Date(endDate);
    realEndDate.setDate(realEndDate.getDate() + 1);
    this.#promotionModel.addPromotion({ name, buy: Number(buy), get: Number(get), startDate: new Date(startDate), realEndDate });
  }

  getInventory() {
    return this.#inventoryModel.getInventory();
  }
}

export default InformationController;
