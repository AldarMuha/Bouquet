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
  constructor(bouquetListContainer, changeData, defferedBouquets) {
    this.#bouquetListContainer = bouquetListContainer;
    this.#changeData = changeData;
    this.#defferedBouquets = defferedBouquets;
  }
  init = (bouquet) => {
    this.#bouquetComponent = new CatalogItemView(bouquet);
    this.#modalComponent = new ModalActiveView(bouquet);

    render(this.#bouquetComponent, this.#bouquetListContainer);

    this.#bouquetComponent.setFavoriteClickHandler(() => {
      console.log(this.#defferedBouquets.products);
      if (this.#defferedBouquets.products !== undefined && !Object.keys(this.#defferedBouquets.products).find((item) => item === bouquet.id)) {
        //console.log('yes')
        this.#changeData(UserAction.ADD_DEFFERED_BOUQUET, UpdateType.MINOR, bouquet);
        //this.#bouquetComponent
      }
      //console.log('no');
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
      this.#changeData(UserAction.ADD_DEFFERED_BOUQUET, UpdateType.MINOR, bouquet);
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
