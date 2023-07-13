/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export function cardDefinition(card, data) {
  const cardPrefix = String(card).slice(0, 4);

  for (let i = 0; i < data.length; i++) {
    const { validNaber } = data[i];
    if (validNaber.some((num) => String(num).startsWith(cardPrefix))) {
      return data[i].name;
    }
  }
  return 'Не валидный номер карты';
}
