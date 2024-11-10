class PromotionModel {
  #promotions;
  constructor() {
    this.#promotions = [];
  }

  setPromotions(data) {
    this.#promotions = data;
  }

  getPromotions() {
    return this.#promotions;
  }

  addPromotion(promotionInfo) {
    this.#promotions.push(promotionInfo);
  }
}

export default PromotionModel;
