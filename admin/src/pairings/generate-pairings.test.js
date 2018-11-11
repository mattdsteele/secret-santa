import { makePairings } from './generate-pairings';
describe('test pairings', () => {
  test('make pairings', () => {
    const users = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const pairings = makePairings(users);
    expect(pairings.length).toBe(4);
  });
  test('pairwise pairings', () => {
    const users = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const pairings = makePairings(users);
    expect(pairings.every(pairing => pairing.gifter)).toBe(true);
    expect(pairings.every(pairing => pairing.giftee)).toBe(true);
  });
  test('actual values', () => {
    const users = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const pairings = makePairings(users);
    const [firstPairing] = pairings;
    const { gifter, giftee } = firstPairing;
    expect(gifter).toBe('8');
    expect(giftee).toBe('2');
  });
});
