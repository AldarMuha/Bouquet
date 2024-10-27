import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, textName } = filter;
  return (`
      <div class="filter-field-img filter-color__form-field">
        <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-${type}" name="colors" value="color-${type}" data-filter-color="color-${type}" ${type === currentFilterType ? 'checked' : ''}>
        <label class="filter-field-img__label" for="filter-colors-field-id-${type}"><span class="filter-field-img__img">
        <picture>
          <source type="image/webp" srcset="img/content/filter-${type}.webp, img/content/filter-${type}@2x.webp 2x"><img src="img/content/filter-${type}.png" srcset="img/content/filter-${type}@2x.png 2x" width="130" height="130" alt="все цвета">
        </picture></span><span class="filter-field-img__text">${textName}</span></label>
      </div>
  `);
};
const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(' ');
  return (`
    <section class="filter-color">
          <div class="container">
            <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
            <form class="filter-color__form" action="#" method="post">
              <div class="filter-color__form-fields" data-filter-color="filter">
                ${filterItemsTemplate}
              </div>
              <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
            </form>
          </div>
        </section>
  `);
};

export default class FilterColorView extends AbstractView {
  #filter = null;
  #currentFilter = null;

  constructor(filter, currentFilterType) {
    super();
    this.#filter = filter;
    this.#currentFilter = currentFilterType;
  }
  get template() {
    return createFilterTemplate(this.#filter, this.#currentFilter);
  }
  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };
  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
