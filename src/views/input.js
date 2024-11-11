import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async readOrder() {
    return await Console.readLineAsync('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
  },
  async suggestBuy(name, cnt) {
    return await Console.readLineAsync(`현재 ${name} ${cnt}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`);
  },
  async suggestGift(name, cnt) {
    return await Console.readLineAsync(`현재 ${name}은(는) ${cnt}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`);
  },
  async suggestMembership() {
    return await Console.readLineAsync(`멤버십 할인을 받으시겠습니까? (Y/N)\n`);
  },
};

export default InputView;
