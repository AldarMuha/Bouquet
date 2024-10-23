import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createHeaderCountViewTemplate = (defferedBouquets) =>
  `
            <div class="header-count">
              <button class="header-count__btn" type="button">
                <svg width="60" height="47" aria-hidden="true">
                  <use xlink:href="#icon-heart-header"></use>
                </svg>
                <span class="visually-hidden">закрыть</span>
              </button>
              <div class="header-count__count">
                <p class="text text--size-20 header-count__counter">${(defferedBouquets.productCount) ? defferedBouquets.productCount : '0'}</p>
              </div>
              <div class="header-count__block">
                <p class="text text--size-20 header-count__text">сумма</p>
                <b class="price price--size-min header-count__price">
                  ${(defferedBouquets.sum) ? defferedBouquets.sum : '0'}
                  <span>Р</span>
                </b>
              </div>
            </div>
`;

export default class HeaderCountView extends AbstractStatefulView {
  #defferedBouquets = null;
  constructor(defferedBouquets) {
    super();
    this.#defferedBouquets = defferedBouquets;
  }
  get template() {
    return createHeaderCountViewTemplate(this.#defferedBouquets);
  }
  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.querySelector('.header-count__btn').addEventListener('click', this.#buttonClickHandler);
  };
  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonClick();
  }
}
