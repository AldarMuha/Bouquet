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
}
