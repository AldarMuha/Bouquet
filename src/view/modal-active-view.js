import AbstractStatefulView from "../framework/view/abstract-stateful-view";

const createModalActiveViewTemplate = (bouquet) =>
  `
    <div class="modal modal--preload modal--product is-active" data-modal="product-card">
      <div class="modal__wrapper">
        <div class="modal__overlay" data-close-modal></div>
        <div class="modal__content">
          <div class="modal-product">
            <button class="btn-close modal-product__btn-close" type="button" data-close-modal aria-label="Закрыть">
              <svg width="55" height="56" aria-hidden="true">
                <use xlink:href="#icon-close-big"></use>
              </svg>
            </button>
            <svg class="modal-product__btn-close modal-product__loader" width="56" height="56" aria-hidden="true">
              <use xlink:href="#icon-loader"></use>
            </svg>
            <div class="image-slider swiper modal-product__slider">
              <div class="image-slides-list swiper-wrapper">
                ${/*bouquet.images.map((bouquetImage) =>*/ `
                  <div class="image-slides-list__item swiper-slide">
                    <div class="image-slide">
                      <picture>
                        <source type="image/webp"><img src=${bouquet.previewImage} width="1274" height="1789" alt="">
                      </picture>
                    </div>
                  </div>
                `/*).join(' ')*/}
              </div>
              <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button">
                <svg width="80" height="85" aria-hidden="true" focusable="false">
                  <use xlink:href="#icon-round-button"></use>
                </svg>
              </button>
              <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button">
                <svg width="80" height="85" aria-hidden="true" focusable="false">
                  <use xlink:href="#icon-round-button"></use>
                </svg>
              </button>
            </div>
            <div class="product-description">
              <div class="product-description__header">
                <h3 class="title title--h2">${bouquet.title}</h3><b class="price price--size-big">${bouquet.price}<span>Р</span></b>
              </div>
              <p class="text text--size-40">${bouquet.description}</p>
              <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>отложить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

export default class ModalActiveView extends AbstractStatefulView {
  #bouquet = null;
  //#differdBouquets = [];
  //#differdBouquet = this.#differdBouquets.find((differdBouquet) => differdBouquet === this.#bouquet.id);
  //#buttonTextStatus = this.#differdBouquet !== undefined ? 'отложено' : 'отложить';
  constructor(bouquet) {
    super();
    this.#bouquet = bouquet;
    //this.#differdBouquets = differdBouquets;
  }
  get template() {
    return createModalActiveViewTemplate(this.#bouquet);
  }
  /*
  get buttonStatusText() {
    return this.#buttonTextStatus;
  }
  set buttonStatusText(buttonTextStatus) {
    this.#buttonTextStatus = buttonTextStatus;
  }
    */
  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.product-description__button').addEventListener('click', this.#favoriteClickHandler);
  }
  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
  setCloseModalClickHandler = (callback) => {
    this._callback.closeModalClick = callback;
    this.element.querySelector('.modal-product__btn-close').addEventListener('click', this.#closeModalClickHandler);
  }
  #closeModalClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeModalClick();
  }
}
