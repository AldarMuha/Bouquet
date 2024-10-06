import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages-view';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import CatalogView from '../view/catalog-view.js';

import { render } from '../framework/render.js';

export default class BouquetsPresenter {
  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #filterReasonComponent = new FilterReasonView();
  #filterColorComponent = new FilterColorView();
  #catalogComponent = new CatalogView();

  #container = null;

  constructor(container) {
    this.#container = container;
  }

  #renderBouquetsBoard() {
    render(this.#heroComponent, this.#container);
    render(this.#missionComponent, this.#container);
    render(this.#advantagesComponent, this.#container);
    render(this.#filterReasonComponent, this.#container);
    render(this.#filterColorComponent, this.#container);
    render(this.#catalogComponent, this.#container);
  }

  init = () => {
    this.#renderBouquetsBoard();
  };
}
