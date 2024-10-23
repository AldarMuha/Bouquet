import AbstractView from '../../framework/view/abstract-view.js';

const createPopupDeferredContainerViewTemplate = () =>
  `
          <div class="popup-deferred__container">
        </div>
      </section>
`;

export default class PopupDeferredContainerView extends AbstractView {
  get template() {
    return createPopupDeferredContainerViewTemplate();
  }
}
