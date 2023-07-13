/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import data from '../../components/numberCardList/namberCardList.json';
import { cardDefinition } from '../CardDefinition';

test('cardDefinition test', () => {
  const numberCard = 4485657421444178;
  const cardDefinitionName = cardDefinition(numberCard, data);
  const result = 'Visa';
  expect(result).toBe(cardDefinitionName);
});
