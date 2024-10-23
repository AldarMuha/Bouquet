import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import CatalogView from '../view/catalog-view.js';
import CatalogContainerView from '../view/catalog-container-view.js';
import CatalogListView from '../view/catalog-list-view.js';
import { BOUQUETS_PER_STEP, SortType } from '../const.js';
import BouquetPresenter from './bouquet-presenter.js';

import { remove, render } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import CatalogButtonsView from '../view/catalog-buttons-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import ShowLessButtonView from '../view/show-less-button-view.js';
import CatalogHeaderView from '../view/catalog-header-view.js';

export default class BouquetsPresenter {
  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #filterReasonComponent = new FilterReasonView();
  #filterColorComponent = new FilterColorView();
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
  #container = null;

  constructor(container, bouquetsModel) {
    this.#container = container;
    this.#bouquetsModel = bouquetsModel;
    this.#bouquetsModel.addObserver(this.#handleModelEvent);
  }

  get bouquets() {
    return this.#bouquetsModel.bouquets;
  }

  get defferedBouquets() {
    return this.#bouquetsModel.defferedBouquets;
  }

  #showMoreButtonClickHandler() {
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

  #renderBouquetsBoard() {
    render(this.#heroComponent, this.#container);
    render(this.#missionComponent, this.#container);
    render(this.#advantagesComponent, this.#container);
    render(this.#filterReasonComponent, this.#container);
    render(this.#filterColorComponent, this.#container);

    render(this.#catalogComponent, this.#container);
    render(this.#catalogContainerComponent, this.#catalogComponent.element);
    //render(this.#catalogHeaderComponent, this.#catalogContainerComponent.element);
    render(this.#catalogListComponent, this.#catalogContainerComponent.element);
    render(this.#catalogButtonsComponent, this.#catalogComponent.element);

    this.bouquets
      .slice(0, Math.min(this.bouquets.length, BOUQUETS_PER_STEP))
      .forEach((bouquet) =>
        this.#renderBouquet(bouquet));

    if (this.bouquets.length > BOUQUETS_PER_STEP) {
      render(this.#showMoreButton, this.#catalogButtonsComponent.element);
      this.#showMoreButton.setClickButtonHandler(() => this.#showMoreButtonClickHandler());
    }
    render(this.#showLessButton, this.#catalogButtonsComponent.element);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

  };
  #renderSort = () => {
    render(this.#catalogHeaderComponent, this.#catalogContainerComponent.element);
    this.#catalogHeaderComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
  #clearBouquets({ resetSortType = false } = {}) {
    this.#bouquetPresenter.forEach((presenter) => presenter.destroy());
    this.#bouquetPresenter.clear();
    remove(this.#catalogButtonsComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

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

  #renderBouquet = async (bouquet) => {
    const bouquetItem = await this.#bouquetsModel.getBouquet(bouquet);
    const bouquetPresenter = new BouquetPresenter(this.#catalogListComponent.element, this.#handleViewAction);
    bouquetPresenter.init(bouquetItem);
    this.#bouquetPresenter.set(bouquet.id, bouquetPresenter);
  };
}
