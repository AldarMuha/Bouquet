import { FilterColorType, FilterReasonType } from "../const.js";

const filterColor = {
  [FilterColorType.ALL]: (bouquets) => [...bouquets],
  [FilterColorType.RED]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === 'red'),
  [FilterColorType.WHITE]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === 'white'),
  [FilterColorType.LILAC]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === 'lilac'),
  [FilterColorType.YELLOW]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === 'yellow'),
  [FilterColorType.PINK]: (bouquets) => bouquets.filter((bouquet) => bouquet.color === 'pink'),
};

const filterReason = {
  [FilterReasonType.ALL]: (bouquets) => [...bouquets],
  [FilterReasonType.BIRTHDAY]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === 'birthdayboy'),
  [FilterReasonType.BRID]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === 'brid'),
  [FilterReasonType.MOTHER]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === 'mother'),
  [FilterReasonType.COLLEAGUE]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === 'colleague'),
  [FilterReasonType.FAVORITE]: (bouquets) => bouquets.filter((bouquet) => bouquet.type === 'favorite'),
};

export { filterColor, filterReason };
