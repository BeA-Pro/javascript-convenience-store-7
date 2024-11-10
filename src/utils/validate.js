const Validate = {
  product(productData) {
    const { name, quantity, price, promotion } = productData;
    const quantityInt = Number(quantity);
    const priceInt = Number(price);
    if (name === undefined || name === '') throw new Error('[ERROR] 저장된 상품명이 올바르지 않습니다.');
    if (!Number.isInteger(quantityInt) || quantityInt < 0) throw new Error('[ERROR] 저장된 상품 수량이 올바르지 않습니다.');
    if (!Number.isInteger(priceInt) || priceInt < 0) throw new Error('[ERROR] 저장된 상품 가격이 올바르지 않습니다.');
    if (promotion === undefined || promotion === '') throw new Error('[ERROR] 저장된 프로모션명이 올바르지 않습니다.');
  },
  promotion(promotionData) {
    const { name, buy, get, startDate, endDate } = promotionData;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const buyInt = Number(buy);
    const getInt = Number(get);
    if (name === undefined || name === '') throw new Error('[ERROR] 저장된 프로모션명이 올바르지 않습니다.');
    if (!Number.isInteger(buyInt) || buyInt < 0) throw new Error('[ERROR] 저장된 프로모션 구매 조건이 올바르지 않습니다.');
    if (!Number.isInteger(getInt) || getInt < 0) throw new Error('[ERROR] 저장된 프로모션 증정 조건이 올바르지 않습니다.');
    if (!regex.test(startDate) || !regex.test(endDate)) throw new Error('[ERROR] 저장된 프로모션 진행 기간이 올바르지 않습니다.');
  },
};

export default Validate;
