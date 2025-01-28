import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createCatalogHeaderViewTemplate = (currentSortType) =>
  `
    <div class="catalogue__header">
      <h2 class="title title--h3 catalogue__title">Каталог</h2>
        <div class="catalogue__sorting">
          <div class="sorting-price">
            <h3 class="title sorting-price__title">Цена</h3>
              <a class="sorting-price__link sorting-price__link--incr${currentSortType === SortType.PRICE_UP ? ' sorting-price__link--active' : ''}" href="#" aria-label="сортировка по возрастанию цены" data-sort-type="${SortType.PRICE_UP}">
                <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <use xlink:href="#icon-increase-sort"></use>
                </svg>
              </a>
              <a class="sorting-price__link ${currentSortType === SortType.PRICE_DOWN ? ' sorting-price__link--active' : ''}" href="#" aria-label="сортировка по убыванию цены" data-sort-type="${SortType.PRICE_DOWN}">
                <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <use xlink:href="#icon-descending-sort"></use>
                </svg>
              </a>
          </div>
        </div>
    </div>
  `;

export default class CatalogHeaderView extends AbstractView {
  #currentSortType = null;
  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }
  get template() {
    return createCatalogHeaderViewTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };
  #sortTypeChangeHandler = (evt) => {
    const sortType = evt.target.dataset.sortType;
    if (evt.target.tagName !== 'A') {
      return;
    }
    if (this.#currentSortType === sortType) {
      return;
    }
    //this.element.querySelectorAll('.sorting-price__link--active').classList.remove('sorting-price__link--active');
    evt.preventDefault();
    //evt.target.classList.add('sorting-price__link--active');
    this.#currentSortType = sortType;
    this._callback.sortTypeChange(sortType);
  };
}
