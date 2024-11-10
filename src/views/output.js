import { Console } from '@woowacourse/mission-utils';
const changeZeroPrice = (price) => {
  if (price === 0) return '재고 없음';
  return `${price}개`;
};
const changeNullPromotion = (promotion) => {
  if (promotion === 'null') return '';
  return promotion;
};
const OutputView = {
  printProducts(products) {
    Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n');
    products.forEach(({ name, price, quantity, promotion }) => {
      Console.print(`- ${name} ${price.toLocaleString()}원 ${changeZeroPrice(quantity)} ${changeNullPromotion(promotion)}`);
    });
    Console.print('');
  },
};

export default OutputView;
