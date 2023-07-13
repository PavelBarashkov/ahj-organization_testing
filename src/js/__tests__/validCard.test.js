/* eslint-disable no-undef */
import { validCard } from '../validCard';

test('valid number card', () => {
  const numberCard = '2720994718931636';
  const valid = validCard(numberCard);
  const result = true;

  expect(result).toBe(valid);
});
