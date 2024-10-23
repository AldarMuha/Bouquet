import AbstractView from '../framework/view/abstract-view.js';

const createCatalogButtonsViewTemplate = () =>
  `
            <div class="catalogue__btn-wrap">
            </div>
`;

export default class CatalogButtonsView extends AbstractView {
  get template() {
    return createCatalogButtonsViewTemplate();
  }
}
