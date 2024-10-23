const BOUQUETS_PER_STEP = 6;

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const UserAction = {
  GET_BOUQUET: 'GET_BOUQUET',
  UPDATE_BOUQUET: 'UPDATE_BOUQUET',
  ADD_DEFFERED_BOUQUET: 'ADD_DEFFERED_BOUQUET',
  DELETE_DEFFERED_BOUQUET: 'DELETE_DEFFERED_BOUQUET',
};

const SortType = {
  DEFAULT: 'default',
  PRICE_DOWN: 'price-down',
  PRICE_UP: 'price-up',
};

export { UpdateType, UserAction, BOUQUETS_PER_STEP, SortType };
