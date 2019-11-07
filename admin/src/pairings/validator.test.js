import { isValidPairing, allValidPairings } from './isValidPairing';
test('valid pairing', () => {
  const fixture = { gifter: 'foo', giftee: 'bar' };
  const pairings = [{ gifter: 'bar', giftee: 'baz', year: 2018 }];
  const relationships = [{ person1: 'bar', person2: 'bif' }];
  expect(isValidPairing(fixture, pairings, relationships)).toBe(true);
});

test('invalid previous rel', () => {
  const fixture = { gifter: 'foo', giftee: 'bar' };
  const pairings = [{ gifter: 'foo', giftee: 'bar', year: 2018 }];
  const relationships = [{ person1: 'bar', person2: 'bif' }];
  expect(isValidPairing(fixture, pairings, relationships)).toBe(false);
});

test('valid reversed pairing', () => {
  const fixture = { gifter: 'foo', giftee: 'bar' };
  const pairings = [{ gifter: 'bar', giftee: 'foo', year: 2018 }];
  const relationships = [{ person1: 'bar', person2: 'bif' }];
  expect(isValidPairing(fixture, pairings, relationships)).toBe(true);
});

test('invalid relationship', () => {
  const fixture = { gifter: 'foo', giftee: 'bar' };
  const pairings = [];
  const relationships = [{ person1: 'bar', person2: 'foo' }];
  expect(isValidPairing(fixture, pairings, relationships)).toBe(false);
});

test('invalid relationship (reverse)', () => {
  const fixture = { gifter: 'foo', giftee: 'bar' };
  const pairings = [];
  const relationships = [{ person1: 'foo', person2: 'bar' }];
  expect(isValidPairing(fixture, pairings, relationships)).toBe(false);
});

test('all valid pairings (false)', () => {
  const fixtures = [
    { gifter: 'foo', giftee: 'bar' },
    { gifter: 'baz', giftee: 'bif' }
  ];
  const pairings = [{ gifter: 'baz', giftee: 'bif', year: 2018 }];
  const relationships = [];
  expect(allValidPairings(fixtures, pairings, relationships)).toBe(false);
});
test('all valid pairings (true)', () => {
  const fixtures = [
    { gifter: 'foo', giftee: 'bar' },
    { gifter: 'baz', giftee: 'bif' }
  ];
  const pairings = [{ gifter: 'foo', giftee: 'bif', year: 2018 }];
  const relationships = [{ person1: 'foo', person2: 'baz' }];
  expect(allValidPairings(fixtures, pairings, relationships)).toBe(true);
});
test('all valid pairings, old history (true)', () => {
  const fixtures = [
    { gifter: 'foo', giftee: 'bar' },
    { gifter: 'baz', giftee: 'bif' }
  ];
  const pairings = [{ gifter: 'baz', giftee: 'bif', year: 2016 }];
  const relationships = [{ person1: 'foo', person2: 'baz' }];
  expect(allValidPairings(fixtures, pairings, relationships, 3)).toBe(true);
});

test('all valid pairings, old history (false)', () => {
  const fixtures = [
    { gifter: 'foo', giftee: 'bar' },
    { gifter: 'baz', giftee: 'bif' }
  ];
  const pairings = [{ gifter: 'baz', giftee: 'bif', year: 2017 }];
  const relationships = [{ person1: 'foo', person2: 'baz' }];
  expect(allValidPairings(fixtures, pairings, relationships, 3)).toBe(false);
});
