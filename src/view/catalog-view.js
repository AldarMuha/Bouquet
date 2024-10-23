import AbstractView from '../framework/view/abstract-view.js';

const createCatalogViewTemplate = () =>
  `
        <div class="catalogue" data-items="catalogue">
        </div>
  `;

export default class CatalogView extends AbstractView {
  get template() {
    return createCatalogViewTemplate();
  }
}
