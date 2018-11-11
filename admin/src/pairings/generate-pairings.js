function shuffle(array, seed) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(seed() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const seed = require('seed-random');
export const makePairings = users => {
  const s = seed('pairing');
  let randomizedUsers = shuffle(users, s);
  const pairings = [];
  while (randomizedUsers.length > 0) {
    const gifter = randomizedUsers.shift();
    const giftee = randomizedUsers.shift();
    pairings.push({ gifter, giftee });
  }
  return pairings;
};
