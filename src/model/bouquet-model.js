import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class BouquetModel extends Observable {
  #bouquetsApiService = null;
  #bouquets = [];
  #defferedBouquets = [];
  #bouquet = null;

  constructor(bouquetsApiService) {
    super();
    this.#bouquetsApiService = bouquetsApiService;
  }

  get bouquets() {
    //console.log(this.#bouquets);
    return this.#bouquets;
  }

  get defferedBouquets() {
    return this.#defferedBouquets;
  }

  async init() {
    try {
      this.#bouquets = await this.#bouquetsApiService.bouquets;
      this.#defferedBouquets = await this.#bouquetsApiService.defferedBouquets;
    } catch (err) {
      this.#bouquets = [];
      this.#defferedBouquets = {};
    }
    this._notify(UpdateType.INIT);
  }
  /*
    updateDefferedBouquet = async (updateType, update) => {
      const index = this.#bouquets.findIndex((bouquet) => bouquet.id === update.id);
      if (index === -1) {
        throw new Error('Can\'t update unexisting bouquet');
      }

      try {
        const response = await this.#bouquetsApiService.updateDefferedBouquet(update);
        const updatedBouquet = response;
        this.#defferedBouquets = [
          ...this.#defferedBouquets.slice(0, index),
          updatedBouquet,
          this.#defferedBouquets.slice(index + 1),
        ];
        this._notify(updateType, updatedBouquet);
      } catch (error) {
        throw new Error('Can\'t update bouquet');
      }
    };
  */
  addDefferedBouquet = async (updateType, update) => {
    try {
      const response = await this.#bouquetsApiService.addDefferedBouquet(update);
      const newDefferedBouquet = response.id;
      if (this.#defferedBouquets.products[newDefferedBouquet]) {
        this.#defferedBouquets.products[newDefferedBouquet] += 1;
      } else {
        this.#defferedBouquets.products = { ...this.#defferedBouquets.products, [newDefferedBouquet]: 1 };
      }
      this.defferedBouquets.productCount += 1;
      this.#defferedBouquets.sum += update.price;
      this._notify(updateType, this.defferedBouquets);
    } catch (err) {
      throw new Error('Can/t add bouquet');
    }
  };

  getBouquet = async (update) => {
    this.#bouquet = await this.#bouquetsApiService.getBouquet(update);
    //console.log(this.#bouquet);
    return this.#bouquet;
    //this._notify(updateType, this.bouquet)
  }

  get bouquet() {
    return this.#bouquet;
  }

  deleteDefferedBouquet = async (updateType, update) => {
    const id = Object.keys(this.#defferedBouquets.products).find((bouquet) => bouquet === update.id);

    try {
      await this.#bouquetsApiService.deleteDefferedBouquet(update);
      // delete this.#defferedBouquets.products[id];

      const count = this.#defferedBouquets.products[id]

      if (count > 0) {
        this.#defferedBouquets.products[id] = count - 1;
      }

      if (this.#defferedBouquets.products[id] === 0) {
        delete this.#defferedBouquets.products[id];
      }

      this.#defferedBouquets.productCount = Object.keys(this.#defferedBouquets.products).reduce((acc, val) => {
        return this.#defferedBouquets.products[val] + acc
      }, 0)

      this.#defferedBouquets.sum -= update.price;

      // if (this.#defferedBouquets.productCount > 0) {
      //   this.#defferedBouquets.productCount -= 1;
      //   this.#defferedBouquets.sum -= update.price;
      // }
      this._notify(updateType, this.#defferedBouquets);
    } catch (err) {
      throw new Error('Can\'t delete bouquet');
    }
  };
}
