/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
export function validCard(numberCard) {
  let sum = 0;
  const strNumberCard = String(numberCard);
  const nDigits = strNumberCard.length;
  const parity = nDigits % 2;

  for (let i = 0; i < nDigits; i++) {
    let digit = parseInt(strNumberCard[i]);

    if (i % 2 === parity) {
      digit *= 2;
    }

    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
