import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createCatalogHeaderViewTemplate = () =>
  `
    <div class="catalogue__header">
      <h2 class="title title--h3 catalogue__title">Каталог</h2>
        <div class="catalogue__sorting">
          <div class="sorting-price">
            <h3 class="title sorting-price__title">Цена</h3>
              <a class="sorting-price__link sorting-price__link--incr sorting-price__link--active" href="#" aria-label="сортировка по возрастанию цены" data-sort-type=${SortType.PRICE_UP}>
                <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
                  <use xlink:href="#icon-increase-sort"></use>
                </svg>
              </a>
              <a class="sorting-price__link" href="#" aria-label="сортировка по убыванию цены" data-sort-type=${SortType.PRICE_DOWN}>
                <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
                  <use xlink:href="#icon-descending-sort"></use>
                </svg>
              </a>
          </div>
        </div>
    </div>
  `;

export default class CatalogHeaderView extends AbstractView {
  get template() {
    return createCatalogHeaderViewTemplate();
  }
  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };
  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName = 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
