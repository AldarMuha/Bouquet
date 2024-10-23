import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonViewTemplate = () =>
  `
                <button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов
              </button>
`;

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonViewTemplate();
  }
  setClickButtonHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.addEventListener('click', this.#buttonClickHandler);
  };
  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonClick();
  }
}
