import AbstractView from '../../framework/view/abstract-view.js';

const createPopupDeferredLinkViewTemplate = () =>
  `
            <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
              <svg width="61" height="24" aria-hidden="true">
                <use xlink:href="#icon-arrow"></use>
              </svg>
            </a>
`;

export default class PopupDeferredLinkView extends AbstractView {
  get template() {
    return createPopupDeferredLinkViewTemplate();
  }
}
