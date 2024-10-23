import AbstractView from '../../framework/view/abstract-view.js';

const createPopupDeferredBtnContainerViewTemplate = () =>
  `
            <div class="popup-deferred__btn-container">
              <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
                <svg width="61" height="24" aria-hidden="true">
                  <use xlink:href="#icon-arrow"></use>
                </svg>
              </button>
            </div>
`;

export default class PopupDeferredBtnContainerView extends AbstractView {
  get template() {
    return createPopupDeferredBtnContainerViewTemplate();
  }
}
