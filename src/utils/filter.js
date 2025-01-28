import { FilterColorType, FilterReasonType } from "../const.js";

const filterColor = {
  [FilterColorType.ALL]: (bouquets) => [...bouquets],
  [FilterColorType.RED]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === FilterColorType.RED),
  [FilterColorType.WHITE]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === FilterColorType.WHITE),
  [FilterColorType.VIOLET]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === FilterColorType.VIOLET),
  [FilterColorType.YELLOW]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === FilterColorType.YELLOW),
  [FilterColorType.PINK]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === FilterColorType.PINK),
};

const filterReason = {
  [FilterReasonType.ALL]: (bouquets) => [...bouquets],
  [FilterReasonType.BIRTHDAY]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === FilterReasonType.BIRTHDAY),
  [FilterReasonType.BRID]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === FilterReasonType.BRID),
  [FilterReasonType.MOTHER]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === FilterReasonType.MOTHER),
  [FilterReasonType.COLLEAGUE]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === FilterReasonType.COLLEAGUE),
  [FilterReasonType.FAVORITE]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === FilterReasonType.FAVORITE),
};

export { filterColor, filterReason };
