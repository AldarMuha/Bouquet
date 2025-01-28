import AbstractView from '../framework/view/abstract-view.js';

const createNoBouquetsViewTemplate = () => `
  <div class="message catalogue__no-items">
    <p class="text text--align-center message__text">Извините, по вашему запросу букетов не найдено</p>
  </div>
`;

export default class NoBouquetsView extends AbstractView {
  get template() {
    return createNoBouquetsViewTemplate();
  }
}
