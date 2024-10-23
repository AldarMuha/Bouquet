const sortPriceUp = (bouquetA, bouquetB) => {
  if (bouquetA.price > bouquetB.price) {
    return 1;
  }
  if (bouquetA.price > bouquetB.price) {
    return -1;
  }
  return 0;
};
const sortPriceDown = (bouquetA, bouquetB) => {
  return sortPriceUp(bouquetB, bouquetA);
};

export { sortPriceUp, sortPriceDown };
