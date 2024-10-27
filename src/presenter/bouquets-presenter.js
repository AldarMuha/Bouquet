import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view';
import CatalogView from '../view/catalog-view.js';
import CatalogContainerView from '../view/catalog-container-view.js';
import CatalogListView from '../view/catalog-list-view.js';
import { BOUQUETS_PER_STEP, SortType } from '../const.js';
import BouquetPresenter from './bouquet-presenter.js';
import { filterReason, filterColor } from '../utils/filter.js';

import { remove, render } from '../framework/render.js';
import { FilterColorType, FilterReasonType, FilterReasonTextName, FilterColorTextName, UpdateType, UserAction } from '../const.js';
import CatalogButtonsView from '../view/catalog-buttons-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import ShowLessButtonView from '../view/show-less-button-view.js';
import CatalogHeaderView from '../view/catalog-header-view.js';
import { sortPriceUp, sortPriceDown } from '../utils.js';
//import FilterPresenter from './filter-presenter.js';

import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';


export default class BouquetsPresenter {
  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();

  #filterReasonComponent = null;
  #filterColorComponent = null;
  #catalogComponent = new CatalogView();
  #catalogContainerComponent = new CatalogContainerView();
  #catalogHeaderComponent = new CatalogHeaderView();
  #catalogListComponent = new CatalogListView();
  #catalogButtonsComponent = new CatalogButtonsView();
  #showMoreButton = new ShowMoreButtonView();
  #showLessButton = new ShowLessButtonView();
  #isLoading = true;
  #currentSortType = SortType.DEFAULT;
  #bouquetPresenter = new Map();

  #renderedBouquetCount = BOUQUETS_PER_STEP;

  #bouquetsModel = null;
  #filterModel = null;
  #container = null;

  constructor(container, bouquetsModel, filterModel) {
    this.#container = container;
    this.#bouquetsModel = bouquetsModel;
    this.#filterModel = filterModel;
    this.#bouquetsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get bouquets() {
    const bouquets = this.#bouquetsModel.bouquets;
    const filtersReasonType = this.#filterModel.filterReason;
    const filtersColorType = this.#filterModel.filterColor;
    //console.log('filterReasonType');
    //console.log(filtersReasonType);
    //console.log('filterColorType');
    //console.log(filtersColorType);
    const filteredReasonBouquets = filterReason['birthdayboy'](bouquets);
    console.log(filteredReasonBouquets);
    const filteredBouquets = filterColor[filtersColorType](filteredReasonBouquets);

    switch (this.#currentSortType) {
      case SortType.PRICE_UP:
        return bouquets.sort(sortPriceUp);
      case SortType.PRICE_DOWN:
        return bouquets.sort(sortPriceDown);
    }
    return bouquets;
  }

  get defferedBouquets() {
    return this.#bouquetsModel.defferedBouquets;
  }

  // getBouquet = async (bouquet) => await this.#bouquetsModel.getBouquet(bouquet);

  #showMoreButtonClickHandler() {
    console.log('showMoreButtonClickHandler', this.bouquets.map(b => b.price));
    this.bouquets
      .slice(this.#renderedBouquetCount, this.#renderedBouquetCount + BOUQUETS_PER_STEP)
      .forEach((bouquet) => {
        this.#renderBouquet(bouquet);
      });
    this.#renderedBouquetCount += BOUQUETS_PER_STEP;
    if (this.#renderedBouquetCount >= this.bouquets.length) {
      this.#showMoreButton.element.remove();
    }
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


  #renderBouquetsBoard() {
    console.log(this.defferedBouquets);
    //const filterPresenter = new FilterPresenter(this.#container, this.#filterModel, this.#bouquetsModel);
    render(this.#heroComponent, this.#container);
    render(this.#missionComponent, this.#container);
    render(this.#advantagesComponent, this.#container);

    //filterPresenter.init();
    //render(this.#filterReasonComponent, this.#container);
    //render(this.#filterColorComponent, this.#container);
    //const filtersColor = this.filtersColor;
    //const filtersReason = this.filtersReason;
    //this.#filterReasonComponent = new FilterReasonView(this.filtersReason, this.#filterModel.filterReason);
    //this.#filterColorComponent = new FilterColorView(this.filtersColor, this.#filterModel.filterColor);
    //render(this.#filterReasonComponent, this.#container);
    //render(this.#filterColorComponent, this.#container);

    render(this.#catalogComponent, this.#container);
    render(this.#catalogContainerComponent, this.#catalogComponent.element);
    //render(this.#catalogHeaderComponent, this.#catalogContainerComponent.element);
    this.#renderSort();
    render(this.#catalogListComponent, this.#catalogContainerComponent.element);
    render(this.#catalogButtonsComponent, this.#catalogComponent.element);

    //console.log('renderBouquetsBoard', this.bouquets.map(b => b.price));

    this.bouquets
      .slice(0, Math.min(this.bouquets.length, BOUQUETS_PER_STEP))
      .forEach((bouquet) => {
        this.#renderBouquet(bouquet);
        //console.log('render', bouquet.price);
      });

    if (this.bouquets.length > BOUQUETS_PER_STEP) {
      render(this.#showMoreButton, this.#catalogButtonsComponent.element);
      this.#showMoreButton.setClickButtonHandler(() => this.#showMoreButtonClickHandler());
    }
    render(this.#showLessButton, this.#catalogButtonsComponent.element);
  }

  #handleSortTypeChange = (sortType) => {
    console.log(sortType);

    if (this.#currentSortType === sortType) {
      return;
    }
    //console.log(this.bouquets.sort(sortPriceUp));
    //console.log(this.bouquets.sort(sortPriceDown));

    this.#currentSortType = sortType;
    this.#clearBouquets();
    this.#renderBouquetsBoard();

    console.log('renderBouquetsBoard', this.bouquets.map(b => b.price));
  };
  #renderSort = () => {
    //this.#catalogHeaderComponent = new CatalogHeaderView()
    render(this.#catalogHeaderComponent, this.#catalogContainerComponent.element);
    this.#catalogHeaderComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
  #clearBouquets() {
    //this.#filterReasonComponent.element.remove();
    //this.#filterColorComponent.element.remove();
    this.#bouquetPresenter.forEach((presenter) => presenter.destroy());
    console.log('clearBouquets -> before', [...this.#bouquetPresenter]);
    this.#bouquetPresenter.clear();
    console.log('clearBouquets -> after', [...this.#bouquetPresenter]);
    remove(this.#catalogButtonsComponent);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.GET_BOUQUET:
        await this.#bouquetsModel.getBouquet(update);
        break;
      case UserAction.UPDATE_BOUQUET:
        break;
      case UserAction.ADD_DEFFERED_BOUQUET:
        try {
          await this.#bouquetsModel.addDefferedBouquet(updateType, update);
        } catch (err) {
          console.log(err);
        }
        break;
      case UserAction.DELETE_DEFFERED_BOUQUET:
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#renderBouquetsBoard();
        break;
      case UpdateType.MINOR:
        this.#renderBouquetsBoard();
        break;
      case UpdateType.MAJOR:
        this.#renderBouquetsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#renderBouquetsBoard();
        break;
    }
  }

  init = () => {
    this.#renderBouquetsBoard();
  };

  #renderBouquet = (bouquet) => {
    //const bouquetItem = this.#bouquetsModel.getBouquet(bouquet);
    const bouquetPresenter = new BouquetPresenter(this.#catalogListComponent.element, this.#handleViewAction, this.defferedBouquets);
    bouquetPresenter.init(bouquet);
    this.#bouquetPresenter.set(bouquet.id, bouquetPresenter);
  };
}
