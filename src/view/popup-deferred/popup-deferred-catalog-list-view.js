import AbstractView from '../../framework/view/abstract-view.js';

const createPopupDeferredCatalogListViewTemplate = () => '<ul class="popup-deferred__catalog"></ul>';

export default class PopupDeferredCatalogListView extends AbstractView {
  get template() {
    return createPopupDeferredCatalogListViewTemplate();
  }
}
