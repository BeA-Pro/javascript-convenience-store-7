import splitter from './splitter.js';

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
  order(orderData) {
    if (orderData.at(0) !== '[' || orderData.at(-1) !== ']') throw new Error('[ERROR] 구매하실 상품명과 수량의 입력 형식을 지켜주세요.');
    const splitOrder = splitter(orderData.slice(1, -1), '-');
    if (splitOrder.length !== 2) throw new Error('[ERROR] 구매하실 상품명과 수량의 입력 형식을 지켜주세요.');
    const name = splitOrder.at(0);
    const quantity = Number(splitOrder.at(1));
    if (name === '') throw new Error('[ERROR] 유효한 구매 상품명을 입력해주세요.');
    if (!Number.isInteger(quantity) || quantity <= 0) throw new Error('[ERROR] 구매 수량은 양의 정수만 입력 가능합니다.');
  },
};

export default Validate;
