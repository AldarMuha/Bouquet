import AbstractView from '../framework/view/abstract-view.js';
import createCatalogListTemplate from './catalog-list-view.js';

const createCatalogViewTemplate = () =>
  `
        <div class="catalogue" data-items="catalogue">
          <div class="container">
          </div>
        </div>
  `;

export default class CatalogView extends AbstractView {
  get template() {
    return createCatalogViewTemplate();
  }
}
