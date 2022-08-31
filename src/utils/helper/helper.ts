/* eslint-disable import/prefer-default-export */
export const convertNumberToDollar = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(number);
