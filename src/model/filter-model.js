import Observable from '../framework/observable.js';
import { FilterColorType, FilterReasonType } from '../const.js';

export default class FilterModel extends Observable {
  #filterColor = FilterColorType.ALL;
  #filterReason = FilterReasonType.ALL;

  get filterColor() {
    return this.#filterColor;
  }
  get filterReason() {
    return this.#filterReason;
  }
  setFilterColor = (updateType, filterColor) => {
    this.#filterColor = filterColor;
    this._notify(updateType, filterColor);
  }
  setFilterReason = (updateType, filterReason) => {
    this.#filterReason = filterReason;
    this._notify(updateType, filterReason);
  }
}
