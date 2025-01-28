import { render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import CatalogItemView from '../view/catalog-item-view.js';
import ModalActiveView from '../view/modal-active-view.js';

export default class BouquetPresenter {
  #bouquetListContainer = null;
  #bouquetComponent = null;
  #changeData = null;
  #modalComponent = null;
  #defferedBouquets = null;
  #isDefferedBouquet = false;
  #countDefferedBouquet = 0;
  //#defferedBouquetsProducts = [];
  constructor(bouquetListContainer, changeData, defferedBouquets) {
    this.#bouquetListContainer = bouquetListContainer;
    this.#changeData = changeData;
    this.#defferedBouquets = defferedBouquets;
  }
  init = (bouquet) => {
    //console.log('init ->', bouquet);

    const prevBouquetComponent = this.#bouquetComponent;
    this.#isDefferedBouquet = Object.keys(this.#defferedBouquets?.products ?? {}).some((defferdBouquet) => defferdBouquet === bouquet.id);
    this.#countDefferedBouquet = this.#isDefferedBouquet ? this.#defferedBouquets.products[bouquet.id] : 0;
    this.#bouquetComponent = new CatalogItemView(bouquet, this.#isDefferedBouquet);
    this.#modalComponent = new ModalActiveView(bouquet, this.#isDefferedBouquet);

    render(this.#bouquetComponent, this.#bouquetListContainer);

    this.#bouquetComponent.setFavoriteClickHandler(() => {
      //console.log(this.#isDefferedBouquet);
      if (!this.#isDefferedBouquet) {
        this.#changeData(UserAction.ADD_DEFFERED_BOUQUET, UpdateType.MAJOR, bouquet);
      } else {
        for (let i = 0; i < this.#countDefferedBouquet; i++) {
          this.#changeData(UserAction.DELETE_DEFFERED_BOUQUET, UpdateType.MAJOR, bouquet);
        }
        // this.#isDefferedBouquet = false;
        console.log(this.#isDefferedBouquet);
      }
    });

    this.#bouquetComponent.setClickBouquetHandler(() => {
      render(this.#modalComponent, document.body);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });

    this.#modalComponent.setCloseModalClickHandler(() => {
      this.#modalComponent.element.remove();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    });
    this.#modalComponent.setFavoriteClickHandler(() => {
      if (!this.#isDefferedBouquet) {
        this.#changeData(UserAction.ADD_DEFFERED_BOUQUET, UpdateType.MAJOR, bouquet);
      } else {
        for (let i = 0; i < this.#countDefferedBouquet; i++) {
          this.#changeData(UserAction.DELETE_DEFFERED_BOUQUET, UpdateType.MAJOR, bouquet);
        }
      }
    });
  }

  destroy = () => {
    this.#bouquetComponent.element.remove();
    this.#modalComponent.element.remove();
  };
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#modalComponent.element.remove();
    }
  };
}
