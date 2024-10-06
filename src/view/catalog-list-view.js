import AbstractView from '../framework/view/abstract-view.js';

const createCatalogListTemplate = () => '<ul class="catalogue__list"></ul>';

export default class CatalogListView extends AbstractView {
  get template() {
    return createCatalogListTemplate();
  }
}
