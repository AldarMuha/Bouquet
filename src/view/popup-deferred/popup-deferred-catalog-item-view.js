import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

const createPopupDeferredCatalogItemViewTemplate = (bouquet, count, isLoading) => `
  <li class="popup-deferred__item">
    <div class="deferred-card ${isLoading ? ' .is-loading' : ''}">
      <div class="deferred-card__img">
        <picture>
          <source type="image/webp"><img src="img/content/defer3.jpg" srcset=${bouquet.previewImage} width="344" height="408" alt="букет">
        </picture>
      </div>
      <div class="deferred-card__content">
        <h2 class="title title--h2">${bouquet.title}</h2>
        <p class="text text--size-40">${bouquet.description}</p>
      </div>
      <div class="deferred-card__count">
        <button class="btn-calculate" id="btn-remove" type="button">
          <svg width="30" height="27" aria-hidden="true">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button><span id="count">${count}</span>
        <button class="btn-calculate" id="btn-add" type="button">
          <svg width="30" height="28" aria-hidden="true">
            <use xlink:href="#icon-cross"></use>
          </svg>
        </button>
      </div>
      <div class="deferred-card__price"><b class="price price--size-middle-p">${bouquet.price}<span>Р</span></b>
      </div>
      <button class="btn-close deferred-card__close-btn" type="button">
        <svg width="55" height="56" aria-hidden="true">
          <use xlink:href="#icon-close-big"></use>
        </svg>
      </button>
      <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
        <use xlink:href="#icon-loader"></use>
      </svg>
    </div>
  </li>
`;

export default class PopupDeferrdCatalogItemView extends AbstractStatefulView {
  #bouquet = null;
  //#defferdBouquet = null;
  #count = 0;
  #isLoading = true;

  constructor(bouquet, count, isLoading) {
    super();
    this.#count = count;
    this.#bouquet = bouquet;
    this.#isLoading = isLoading;
  }
  get template() {
    return createPopupDeferredCatalogItemViewTemplate(this.#bouquet, this.#count, this.#isLoading);
  }
  setButtonAddClickHandler = (callback) => {
    this._callback.buttonAddClick = callback;
    this.element.querySelector('#btn-add').addEventListener('click', this.#buttonAddClickHandler);

  }
  #buttonAddClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonAddClick();
    //this._setState({ count: this._state.count + 1 });
    //this.element.querySelector('#count').textContent = this._state.count;
  }
  setButtonRemoveClickHandler = (callback) => {
    this._callback.buttonRemoveClick = callback;
    this.element.querySelector('#btn-remove').addEventListener('click', this.#buttonRemoveClickHandler);
  }
  #buttonRemoveClickHandler = (evt) => {
    console.log('buttonRemoveClickHandler');

    evt.preventDefault();
    this._callback.buttonRemoveClick();
    /*
    if (this._state.count >= 1) {
      this._setState({ count: this._state.count - 1 });
      this.element.querySelector('#count').textContent = this._state.count;
    }
      */
  }
  setButtonCloseClickHandler = (callback) => {
    this._callback.buttonCloseClick = callback;
    this.element.querySelector('.btn-close').addEventListener('click', this.#buttonCloseClickHandler);
  }
  #buttonCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonCloseClick();
  }

}
