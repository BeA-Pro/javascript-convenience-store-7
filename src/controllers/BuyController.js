class BuyController {
  #informationController;
  constructor(informationController) {
    this.#informationController = informationController;
  }

  run(buyList, membership) {
    const realBuylist = this.#getRealBuyList(buyList);
  }

  #getRealBuyList(buyList) {
    const list = [];
    for (const buy of buyList) {
      this.#changeInventory(buy);
      list.push({ name: buy.name, price: this.#getPrice(buy) * (buy.promoCnt + buy.giftCnt + buy.notPromoCnt + buy.defaultCnt) });
    }
    return list;
  }

  #changeInventory(buy) {
    this.#informationController.getInventory().
      forEach((product) => {
        if (product.name === buy.name) {
          if (product.promotion === 'null') product.quantity = product.quantity - buy.defaultCnt - buy.notPromoCnt;
          else if (product.promotion !== 'null') product.quantity = product.quantity - buy.promoCnt - buy.giftCnt;
        }
      });
  }

  #getPrice(buy) {
    const product = this.#informationController.getInventory()
      .find((product) => product.name === buy.name);
    if (product === undefined) return 0;
    return product.price;
  }
}
export default BuyController;
