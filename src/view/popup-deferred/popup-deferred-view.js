import AbstractView from '../../framework/view/abstract-view.js';

const createPopupDeferredViewTemplate = () =>
  `
      <section class="popup-deferred">
      </section>
`;

export default class PopupDeferredView extends AbstractView {
  get template() {
    return createPopupDeferredViewTemplate();
  }
}
