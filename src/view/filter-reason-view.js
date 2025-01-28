import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTeplate = (filter, currentFilterType) => {
  const { type, textName } = filter;
  return (`
      <div class="filter-field-text filter-reason__form-field--for-${type} filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-${type} filter-reason__form-field" type="radio" id="filter-reason-field-id-${type}" name="reason" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-${type}"><span class="filter-field-text__text">${textName}</span></label>
      </div>
    `);
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTeplate(filter, currentFilterType)).join(' ');
  return (`
    <section class="filter-reason">
      <div class="container">
        <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
        <form class="filter-reason__form" action="#" method="post">
          <div class="filter-reason__form-fields">
            ${filterItemsTemplate}
          </div>
          <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
        </form>
      </div>
    </section>
`);
};


export default class FilterReasonView extends AbstractView {
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
