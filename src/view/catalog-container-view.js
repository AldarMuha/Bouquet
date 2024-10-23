import AbstractView from '../framework/view/abstract-view.js';

const createCatalogContainerViewTemplate = () =>
  `
          <div class="container">
          </div>
  `;

export default class CatalogContainerView extends AbstractView {
  get template() {
    return createCatalogContainerViewTemplate();
  }
}
