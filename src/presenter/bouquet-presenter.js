import { render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import CatalogItemView from '../view/catalog-item-view.js';
import ModalActiveView from '../view/modal-active-view.js';

export default class BouquetPresenter {
  #bouquetListContainer = null;
  #bouquetComponent = null;
  #changeData = null;
  #modalComponent = null;
  constructor(bouquetListContainer, changeData) {
    this.#bouquetListContainer = bouquetListContainer;
    this.#changeData = changeData;
  }
  init = (bouquet) => {
    this.#bouquetComponent = new CatalogItemView(bouquet);
    this.#modalComponent = new ModalActiveView(bouquet);

    render(this.#bouquetComponent, this.#bouquetListContainer);

    this.#bouquetComponent.setFavoriteClickHandler(() => {
      this.#changeData(UserAction.ADD_DEFFERED_BOUQUET, UpdateType.MINOR, bouquet);
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
    this.#bouquetComponent.remove();
    this.#modalComponent.remove();
  };
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#modalComponent.element.remove();
    }
  };
}
