import { makePairings } from './generate-pairings';
describe('test pairings', () => {
  test('make pairings', () => {
    const users = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const pairings = makePairings(users, false);
    expect(pairings.length).toBe(8);
  });
  test('pairwise pairings', () => {
    const users = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const pairings = makePairings(users, false);
    expect(pairings.every(pairing => pairing.gifter)).toBe(true);
    expect(pairings.every(pairing => pairing.giftee)).toBe(true);
  });
  test('uniques across gifters and giftees', () => {
    const users = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const pairings = makePairings(users, false);
    users.forEach(u => {
      expect(pairings.filter(p => p.gifter === u).length).toBe(1);
      expect(pairings.filter(p => p.giftee === u).length).toBe(1);
    });
  });
  test('actual values', () => {
    const users = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const pairings = makePairings(users, false);
    const [firstPairing] = pairings;
    const { gifter, giftee } = firstPairing;
    expect(gifter).toBe('8');
    expect(giftee).toBe('6');
  });
});
