import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import CatalogView from '../view/catalog-view.js';

import { render } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';

export default class BouquetsPresenter {
  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #filterReasonComponent = new FilterReasonView();
  #filterColorComponent = new FilterColorView();
  #catalogComponent = new CatalogView();
  #isLoading = true;

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

  #renderBouquetsBoard() {
    const bouquets = this.bouquets;
    console.log(this.#bouquetsModel);
    render(this.#heroComponent, this.#container);
    render(this.#missionComponent, this.#container);
    render(this.#advantagesComponent, this.#container);
    render(this.#filterReasonComponent, this.#container);
    render(this.#filterColorComponent, this.#container);
    render(this.#catalogComponent, this.#container);
  }

  #handleViewAction =

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
}
