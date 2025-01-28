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

const FilterColorType = {
  ALL: 'all',
  RED: 'red',
  WHITE: 'white',
  VIOLET: 'violet',
  YELLOW: 'yellow',
  PINK: 'pink',
};

const FilterColorTextName = {
  ALL: 'все цвета',
  RED: 'красный',
  WHITE: 'белый',
  VIOLET: 'сиреневый',
  YELLOW: 'желтый',
  PINK: 'розовый',
}

const FilterReasonType = {
  ALL: 'all',
  BIRTHDAY: 'birthdayboy',
  BRID: 'bridge',
  MOTHER: 'motherday',
  COLLEAGUE: 'colleagues',
  FAVORITE: 'forlove',
};

const FilterReasonTextName = {
  ALL: 'Для всех',
  BIRTHDAY: 'Имениннику',
  BRID: 'Невесте',
  MOTHER: 'Маме',
  COLLEAGUE: 'Коллеге',
  FAVORITE: 'Любимой',
};

export { UpdateType, UserAction, BOUQUETS_PER_STEP, SortType, FilterColorType, FilterReasonType, FilterColorTextName, FilterReasonTextName };
