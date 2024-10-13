import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class BouquetModel extends Observable {
  #bouquetsApiService = null;
  #bouquets = [];
  #defferedBouquets = [];

  constructor(bouquetsApiService) {
    super();
    this.#bouquetsApiService = bouquetsApiService;
  }

  get bouquets() {
    return this.#bouquets;
  }

  get defferedBouquets() {
    return this.#defferedBouquets;
  }

  async init() {
    try {
      this.#bouquets = await this.#bouquetsApiService.bouquets;
      this.#defferedBouquets = await this.#bouquetsApiService.defferedBouquets;
      console.log(this.#defferedBouquets);
    } catch (err) {
      this.#bouquets = [];
      this.#defferedBouquets = {};
    }
    this._notify(UpdateType.INIT);
  }

  updateDefferedBouquet = async (updateType, update) => {
    const index = this.#bouquets.findIndex((bouquet) => bouquet.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting bouquet');
    }

    try {
      const response = await this.#bouquetsApiService.updateDefferedBouquet(update);
      const updatedBouquet = response;
      this.#bouquets = [
        ...this.#defferedBouquets.slice(0, index),
        update,
        this.#defferedBouquets.slice(index + 1),
      ];
      this._notify(updateType, updatedBouquet);
    } catch (error) {
      throw new Error('Can\'t update bouquet');
    }
  };

  addDefferedBouquet = async (updateType, update) => {
    try {
      const response = await this.#bouquetsApiService.addDefferedBouquet(update);
      const newDefferedBouquet = response;
      this.#bouquets = [newDefferedBouquet, ...response];
      this._notify(updateType, newDefferedBouquet);
    } catch (err) {
      throw new Error('Can/t add bouquet');
    }
  };

  deleteDefferedBouquet = async (updateType, update) => {
    const index = this.#bouquets.findIndex((bouquet) => bouquet.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting bouquet');
    }
    try {
      await this.#bouquetsApiService.deleteDefferedBouquet(update);
      this.#bouquets = [
        ...this.#defferedBouquets.slice(0, index),
        ...this.#defferedBouquets.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete bouquet');
    }
  };
}
