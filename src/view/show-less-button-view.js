import AbstractView from '../framework/view/abstract-view.js';

const createShowLessButtonViewTemplate = () =>
  `
  <button class="btn-round btn-round--to-top btn-round--size-small catalogue__to-top-btn" type="button" aria-label="наверх">
    <svg width="80" height="85" aria-hidden="true" focusable="false">
      <use xlink:href="#icon-round-button"></use>
    </svg>
  </button>
`;

export default class ShowLessButtonView extends AbstractView {
  get template() {
    return createShowLessButtonViewTemplate();
  }
}
