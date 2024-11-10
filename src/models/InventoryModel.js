class InventoryModel {
  #inventory;
  constructor() {
    this.#inventory = [];
  }

  setInventory(data) {
    this.#inventory = data;
  }

  getInventory() {
    return this.#inventory;
  }

  addProduct(product) {
    this.#inventory.push(product);
  }
}

export default InventoryModel;
