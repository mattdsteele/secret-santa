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
export const makePairings = (users, realRandomValues = true) => {
  const s = seed('pairing', { entropy: realRandomValues });
  const randomizedGifters = shuffle(users, s);
  let randomizedGiftees = shuffle([...users], s);
  return randomizedGifters.map(gifter => {
    let giftee = null;
    while (!giftee) {
      const [gifteeCandidate] = randomizedGiftees;
      if (gifteeCandidate !== gifter) {
        giftee = randomizedGiftees.shift();
      } else {
        randomizedGiftees = shuffle(randomizedGiftees, s);
      }
    }
    return { gifter, giftee };
  });
};
