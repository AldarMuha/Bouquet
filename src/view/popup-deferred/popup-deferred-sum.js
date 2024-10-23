import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

const createPopupDeferredSumViewTemplate = (deferredBouquets) =>
  `
            <div class="popup-deferred__sum">
              <p class="text text--total">Итого вы выбрали:</p>
              <div class="popup-deferred__block-wrap">
                <div class="popup-deferred__block">
                  <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">${deferredBouquets.productCount}</span>
                </div>
                <div class="popup-deferred__block">
                  <p class="text text--total">Сумма</p><b class="price price--size-middle-p">${deferredBouquets.sum}<span>Р</span></b>
                </div>
              </div>
            </div>
`;

export default class PopupDeferredSumView extends AbstractStatefulView {
  #deferredBouquets = {
    sum: 0,
    productCount: 0,
  };
  constructor(deferredBouquets) {
    super();
    this.#deferredBouquets = deferredBouquets;
  }
  get template() {
    return createPopupDeferredSumViewTemplate(this.#deferredBouquets);
  }
}
