import { remove, render, RenderPosition, replace } from '../framework/render.js';
import HeaderCountView from '../view/header-count-view.js';
import { UpdateType, UserAction } from '../const.js';
import PopupDeferredView from '../view/popup-deferred/popup-deferred-view.js';
import PopupDeferredWrapperView from '../view/popup-deferred/popup-deferred-wrapper-view.js';
import HeroPopupView from '../view/popup-deferred/hero-popup-view.js';
import PopupDeferredContainerView from '../view/popup-deferred/popup-deferred-container-view.js';
import PopupDeferredLinkView from '../view/popup-deferred/popup-deferred-link.js';
import PopupDeferredCatalogListView from '../view/popup-deferred/popup-deferred-catalog-list-view.js';
import PopupDeferrdCatalogItemView from '../view/popup-deferred/popup-deferred-catalog-item-view.js';
import PopupDeferredBtnContainerView from '../view/popup-deferred/popup-deferred-btn-container.js';
import PopupDeferredSumView from '../view/popup-deferred/popup-deferred-sum.js';

export default class HeaderPresenter {
  #bouquetsModel = null;
  #container = null;
  #containerMain = null;
  #isLoading = true;
  #headerCountComponent = null;

  #popupDeferredComponent = new PopupDeferredView();
  #popupDeferredWrapperComponent = new PopupDeferredWrapperView();
  #heroPopupComponent = new HeroPopupView();
  #popupDeferredContainerComponent = new PopupDeferredContainerView();

  #popupDeferredLinkComponent = new PopupDeferredLinkView();
  #popupDeferredCatalogListComponent = new PopupDeferredCatalogListView();
  #popupDeferredCatalogItemComponent = new PopupDeferrdCatalogItemView();
  #popupDeferredBtnContainerComponent = new PopupDeferredBtnContainerView();
  #popupDeferredSumComponent = new PopupDeferredSumView();
  #buqets = {};

  #bouquetsPresenter = null;

  constructor(container, containerMain, bouquetsModel, bouquetsPresenter) {
    this.#container = container;
    this.#containerMain = containerMain;
    this.#bouquetsModel = bouquetsModel;
    this.#bouquetsPresenter = bouquetsPresenter;
    this.#bouquetsModel.addObserver(this.#handleModelEvent);
  }
  get defferedBouquets() {
    return this.#bouquetsModel.defferedBouquets;
  }
  get bouquets() {
    return this.#bouquetsModel.bouquets;
  }
  #renderHeader() {
    const prevHeaderCountComponent = this.#headerCountComponent;
    this.#headerCountComponent = new HeaderCountView(this.defferedBouquets);

    if (prevHeaderCountComponent === null) {
      render(this.#headerCountComponent, this.#container);
      return;
    }
    replace(this.#headerCountComponent, prevHeaderCountComponent);
    remove(prevHeaderCountComponent);

    this.#headerCountComponent.setButtonClickHandler(() => this.#renderPopupDeferred());
  }
  init = () => {
    this.#renderHeader();
  }
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#renderHeader();
        this.#renderPopupDeferred();
        console.log('patch');
        break;
      case UpdateType.INIT:
        this.#renderHeader();
        console.log('init');
        break;
      case UpdateType.MAJOR:
        this.#renderHeader();
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.GET_BOUQUET:
        await this.#bouquetsModel.getBouquet(update);
        this.#isLoading = false;
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
        try {
          await this.#bouquetsModel.deleteDefferedBouquet(updateType, update);
        } catch (err) {
          console.log(err);
        }
        break;
    }
  };
  #renderCatalogItem = (bouquet, defferedBouquets, isLoading) => {
    const card = new PopupDeferrdCatalogItemView(bouquet, defferedBouquets, isLoading);
    this.#buqets[bouquet.id] = card
    render(card, this.#popupDeferredCatalogListComponent.element);
    card.setButtonAddClickHandler(() => {
      this.#handleViewAction(UserAction.ADD_DEFFERED_BOUQUET, UpdateType.PATCH, bouquet);
      //this.#containerMain.innerHTML = '';
      // this.#renderPopupDeferred();
      //console.log('pp', this.defferedBouquets);
    });
    card.setButtonRemoveClickHandler(() => {
      this.#handleViewAction(UserAction.DELETE_DEFFERED_BOUQUET, UpdateType.PATCH, bouquet);
    });
    card.setButtonCloseClickHandler(() => {
      if (this.#isLoading === true) {

      }
      for (let index = 0; index < defferedBouquets; index++) {
        this.#handleViewAction(UserAction.DELETE_DEFFERED_BOUQUET, UpdateType.PATCH, bouquet);
      }
      //this.#isLoading = false;
      //console.log(this.#isLoading);
    });
  };

  #renderPopupDeferred = () => {
    this.#containerMain.innerHTML = '';
    const cardsBouquetId = Object.keys(this.defferedBouquets.products);
    remove(this.#popupDeferredComponent);
    remove(this.#popupDeferredWrapperComponent);
    remove(this.#heroPopupComponent);
    remove(this.#popupDeferredContainerComponent);
    render(this.#popupDeferredComponent, this.#containerMain, RenderPosition.AFTERBEGIN);
    render(this.#popupDeferredWrapperComponent, this.#popupDeferredComponent.element);
    render(this.#heroPopupComponent, this.#popupDeferredWrapperComponent.element);
    render(this.#popupDeferredContainerComponent, this.#popupDeferredWrapperComponent.element);
    console.log(cardsBouquetId);
    Object.keys(this.#buqets ?? {}).forEach(id => remove(this.#buqets[id]))
    cardsBouquetId.forEach((cardId) => {
      const bouq = this.bouquets.find((bouquet) => bouquet.id === cardId);
      const defBouq = Object.entries(this.defferedBouquets.products).find((product) => product[0] === bouq.id)[1]
      this.#renderCatalogItem(bouq, defBouq, this.#isLoading);
    });

    render(this.#popupDeferredLinkComponent, this.#popupDeferredContainerComponent.element);
    render(this.#popupDeferredCatalogListComponent, this.#popupDeferredContainerComponent.element);
    render(this.#popupDeferredBtnContainerComponent, this.#popupDeferredContainerComponent.element);
    this.#popupDeferredBtnContainerComponent.setButtonClick(() => {
      cardsBouquetId.forEach((cardId) => {
        const bouq = this.bouquets.find((bouquet) => bouquet.id === cardId);
        const countBouq = Object.entries(this.defferedBouquets.products).find((product) => product[0] === bouq.id)[1];
        for (let index = 0; index < countBouq; index++) {
          this.#handleViewAction(UserAction.DELETE_DEFFERED_BOUQUET, UpdateType.PATCH, bouq);
        }
      });
    });
    render(new PopupDeferredSumView(this.defferedBouquets), this.#popupDeferredContainerComponent.element);
    this.#heroPopupComponent.setButtonCloseClickHandler(() => {
      this.#containerMain.innerHTML = '';
      this.#bouquetsPresenter.init();
    });
    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      this.#containerMain.innerHTML = '';
      this.#bouquetsPresenter.init();
    });
  };

}
