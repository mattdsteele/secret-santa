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
  while (true) {
    try {
      return naiiveMakePairings([...users], realRandomValues);
    } catch (e) {
      console.log('circular, trying again');
    }
  }
};
export const naiiveMakePairings = (users, realRandomValues = true) => {
  const shuffler = seed('pairing', { entropy: realRandomValues });
  const randomizedGifters = shuffle(users, shuffler);
  let randomizedGiftees = shuffle([...users], shuffler);
  return randomizedGifters.map(gifter => {
    let giftee = null;
    while (!giftee) {
      const [gifteeCandidate] = randomizedGiftees;
      if (gifteeCandidate !== gifter) {
        giftee = randomizedGiftees.shift();
      } else {
        if (randomizedGiftees.length === 1) {
          throw new Error(
            `ran out of users and they are equal, whaaat, ${gifteeCandidate}, ${gifter}`
          );
        }
        randomizedGiftees = shuffle(randomizedGiftees, shuffler);
      }
    }
    return { gifter, giftee };
  });
};
