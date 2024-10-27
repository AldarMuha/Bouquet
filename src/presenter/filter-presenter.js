import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import { FilterColorType, FilterReasonType, FilterReasonTextName, FilterColorTextName, UpdateType } from '../const.js';
import { render, replace } from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #bouquetModel = null;

  #filterReasonComponent = null;
  #filterColorComponent = null;

  constructor(filterContainer, filterModel, bouquetModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#bouquetModel = bouquetModel;

    this.#bouquetModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filtersColor() {
    return [
      {
        type: FilterColorType.ALL,
        textName: FilterColorTextName.ALL,
      },
      {
        type: FilterColorType.RED,
        textName: FilterColorTextName.RED,
      },
      {
        type: FilterColorType.WHITE,
        textName: FilterColorTextName.WHITE,
      },
      {
        type: FilterColorType.LILAC,
        textName: FilterColorTextName.LILAC,
      },
      {
        type: FilterColorType.YELLOW,
        textName: FilterColorTextName.YELLOW,
      },
      {
        type: FilterColorType.PINK,
        textName: FilterColorTextName.PINK,
      },
    ];
  }

  get filtersReason() {
    return [
      {
        type: FilterReasonType.ALL,
        textName: FilterReasonTextName.ALL,
      },
      {
        type: FilterReasonType.BIRTHDAY,
        textName: FilterReasonTextName.BIRTHDAY,
      },
      {
        type: FilterReasonType.BRID,
        textName: FilterReasonTextName.BRID,
      },
      {
        type: FilterReasonType.MOTHER,
        textName: FilterReasonTextName.MOTHER,
      },
      {
        type: FilterReasonType.COLLEAGUE,
        textName: FilterReasonTextName.COLLEAGUE,
      },
      {
        type: FilterReasonType.FAVORITE,
        textName: FilterReasonTextName.FAVORITE,
      },
    ];
  }

  init = () => {
    const filtersColor = this.filtersColor;
    const filtersReason = this.filtersReason;
    const prevFilterReasonComponent = this.#filterReasonComponent;
    const prevFilterColorComponent = this.#filterColorComponent;
    this.#filterReasonComponent = new FilterReasonView(filtersReason, this.#filterModel.filterReason);
    this.#filterColorComponent = new FilterColorView(filtersColor, this.#filterModel.filterColor);
    this.#filterReasonComponent.setFilterTypeChangeHandler(this.#filterTypeReasonChangeHandler);
    this.#filterColorComponent.setFilterTypeChangeHandler(this.#filterTypeColorChangeHandler);

    if (prevFilterReasonComponent === null || prevFilterColorComponent === null) {
      render(this.#filterReasonComponent, this.#filterContainer);
      render(this.#filterColorComponent, this.#filterContainer);
    }
    replace(this.#filterReasonComponent, prevFilterReasonComponent);
    replace(this.#filterColorComponent, prevFilterColorComponent);

    //render(this.#filterReasonComponent, this.#filterContainer);
    //render(this.#filterColorComponent, this.#filterContainer);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #filterTypeColorChangeHandler = (filterType) => {
    if (this.#filterModel.filterColor === filterType) {
      return;
    }
    this.#filterModel.setFilterColor(UpdateType.MAJOR, filterType);
  };

  #filterTypeReasonChangeHandler = (filterType) => {
    if (this.#filterModel.filterReason === filterType) {
      return;
    }
    this.#filterModel.setFilterReason(UpdateType.MAJOR, filterType);
  };
}
