import AbstractView from '../../framework/view/abstract-view.js';

const createPopupDeferredWrapperViewTemplate = () =>
  `
        <div class="popup-deferred__wrapper">
        </div>
`;

export default class PopupDeferredWrapperView extends AbstractView {
  get template() {
    return createPopupDeferredWrapperViewTemplate();
  }
}
