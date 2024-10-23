import AbstractView from '../framework/view/abstract-view.js';

const createHeaderContainerViewTemplate = () => '<div class="header__container"></div>';

export default class HeaderContainerView extends AbstractView {
  get template() {
    return createHeaderContainerViewTemplate();
  }
}
