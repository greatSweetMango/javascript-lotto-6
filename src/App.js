import { Random, Console } from '@woowacourse/mission-utils';
import GameError from './LottoError.js';
import Lotto from './Lotto.js';
import { LOTTO_PRIZE } from './constants.js';

class App {
  #generatRandomLottos(purchaseAmount) {
    if (purchaseAmount % LOTTO_PRIZE != 0)
      throw new GameError(`로또 구입 금액은 ${LOTTO_PRIZE}원 단위입니다.`);

    const lottoAmount = purchaseAmount / 1000;
    Console.print(`${lottoAmount}개를 구매했습니다.`);

    const lottos = [];
    for (let i = 0; i < lottoAmount; i++) {
      const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const newLotto = new Lotto(lottoNumbers);
      newLotto.printLottoNumbers();
      lottos.push(newLotto);
    }

    return lottos;
  }

  async play() {
    const purchaseAmount = await Console.readLineAsync(
      '로또 구입 금액을 입력해 주세요.\n'
    );
    const lottos = this.#generatRandomLottos(Number(purchaseAmount));
  }
}

export default App;
