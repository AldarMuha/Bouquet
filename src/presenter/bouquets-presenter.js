import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view';
import CatalogView from '../view/catalog-view.js';
import CatalogContainerView from '../view/catalog-container-view.js';
import CatalogListView from '../view/catalog-list-view.js';
import { BOUQUETS_PER_STEP, SortType } from '../const.js';
import BouquetPresenter from './bouquet-presenter.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { FilterColorType, FilterReasonType, FilterReasonTextName, FilterColorTextName, UpdateType, UserAction } from '../const.js';
import CatalogButtonsView from '../view/catalog-buttons-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import ShowLessButtonView from '../view/show-less-button-view.js';
import CatalogHeaderView from '../view/catalog-header-view.js';
import { sortPriceUp, sortPriceDown } from '../utils.js';

import { filterReason, filterColor } from '../utils/filter.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';

import NoBouquetsView from '../view/no-bouquets-view.js';
import ErrorMessageView from '../view/error-message-view.js';


export default class BouquetsPresenter {
  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #filterReasonComponent = null;
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
  #filterColorComponent = null;
  #noBouquetsView = new NoBouquetsView();
  #errorComponent = new ErrorMessageView();


  constructor(container, bouquetsModel, filterModel) {
    this.#container = container;
    this.#bouquetsModel = bouquetsModel;
    this.#filterModel = filterModel;
    this.#filterColorComponent = new FilterColorView(this.filtersColor, this.#filterModel.filterColor);
    this.#filterReasonComponent = new FilterReasonView(this.filtersReason, this.#filterModel.filterReason);
    this.#bouquetsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get bouquets() {
    const bouquets = this.#bouquetsModel.bouquets;
    const filtersReasonType = this.#filterModel.filterReason;
    const filtersColorType = this.#filterModel.filterColor;
    const filteredReasonBouquets = filterReason[filtersReasonType](bouquets);
    const filteredBouquets = filterColor[filtersColorType](filteredReasonBouquets);

    switch (this.#currentSortType) {
      case SortType.PRICE_UP:
        return filteredBouquets.sort(sortPriceUp);
      case SortType.PRICE_DOWN:
        return filteredBouquets.sort(sortPriceDown);
    }
    return filteredBouquets;
  }

  get defferedBouquets() {
    return this.#bouquetsModel.defferedBouquets;
  }

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
        type: FilterColorType.VIOLET,
        textName: FilterColorTextName.VIOLET,
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
    render(this.#heroComponent, this.#container);
    render(this.#missionComponent, this.#container);
    render(this.#advantagesComponent, this.#container);
    this.#renderFilter();

    render(this.#catalogComponent, this.#container);
    render(this.#catalogContainerComponent, this.#catalogComponent.element);
    this.#renderSort();
    remove(this.#noBouquetsView)
    if (this.bouquets.length === 0) {
      this.#renderNoBouquets();
      return;
    }
    render(this.#catalogListComponent, this.#catalogContainerComponent.element);
    render(this.#catalogButtonsComponent, this.#catalogComponent.element);

    this.bouquets
      .slice(0, Math.min(this.bouquets.length, BOUQUETS_PER_STEP))
      .forEach((bouquet) => {
        this.#renderBouquet(bouquet);
      });

    if (this.bouquets.length > BOUQUETS_PER_STEP) {
      render(this.#showMoreButton, this.#catalogButtonsComponent.element);
      this.#showMoreButton.setClickButtonHandler(() => this.#showMoreButtonClickHandler());
    }
    render(this.#showLessButton, this.#catalogButtonsComponent.element);

  }

  #renderFilter = () => {
    render(this.#filterReasonComponent, this.#container);
    render(this.#filterColorComponent, this.#container);
    this.#filterReasonComponent.setFilterTypeChangeHandler(this.#filterTypeReasonChangeHandler);
    this.#filterColorComponent.setFilterTypeChangeHandler(this.#filterTypeColorChangeHandler);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBouquets();
    this.#renderBouquetsBoard();

    console.log('renderBouquetsBoard', this.bouquets.map(b => b.price));
  };
  #renderSort = () => {
    remove(this.#catalogHeaderComponent);
    this.#catalogHeaderComponent = new CatalogHeaderView(this.#currentSortType);
    render(this.#catalogHeaderComponent, this.#catalogContainerComponent.element);
    this.#catalogHeaderComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
  #clearBouquets({ resetSortType = false } = {}) {
    remove(this.#filterReasonComponent);
    remove(this.#filterColorComponent);
    //remove(this.#catalogHeaderComponent);
    this.#bouquetPresenter.forEach((presenter) => presenter.destroy());
    this.#bouquetPresenter.clear();
    remove(this.#heroComponent);
    remove(this.#missionComponent);
    remove(this.#advantagesComponent);
    remove(this.#catalogContainerComponent);
    remove(this.#noBouquetsView);

    remove(this.#catalogButtonsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
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
          this.#handleErrorMessage();
        }
        break;
      case UserAction.DELETE_DEFFERED_BOUQUET:
        try {
          await this.#bouquetsModel.deleteDefferedBouquet(updateType, update)
        } catch (err) {
          this.#handleErrorMessage();
        }
        break;
    }
  };

  #handleErrorMessage = () => {
    this.#clearBouquets();
    render(this.#errorComponent, this.#container, RenderPosition.BEFOREEND);
    this.#errorComponent.setButtonClick(() => {
      remove(this.#errorComponent);
      this.init();
    });
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#clearBouquets();
        //console.log('nop');
        //this.#renderBouquetsBoard();
        break;
      case UpdateType.MINOR:
        this.#renderBouquetsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBouquets({ resetSortType: true });
        this.#renderBouquetsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        //this.#clearBouquets();
        this.#renderBouquetsBoard();
        break;
    }
  }

  init = () => {
    this.#renderBouquetsBoard();
  };

  #renderBouquet = (bouquet) => {
    const bouquetPresenter = new BouquetPresenter(this.#catalogListComponent.element, this.#handleViewAction, this.defferedBouquets);
    bouquetPresenter.init(bouquet);
    this.#bouquetPresenter.set(bouquet.id, bouquetPresenter);
  };


  #filterTypeColorChangeHandler = (filterType) => {
    if (this.#filterModel.filterColor === filterType) {
      return;
    }
    this.#filterModel.setFilterColor(UpdateType.MAJOR, filterType);
    console.log(filterType);
  };

  #filterTypeReasonChangeHandler = (filterType) => {
    if (this.#filterModel.filterReason === filterType) {
      return;
    }
    this.#filterModel.setFilterReason(UpdateType.MAJOR, filterType);
    console.log(filterType);
  };

  #renderNoBouquets = () => {
    render(this.#noBouquetsView, this.#catalogContainerComponent.element);
  };
}
