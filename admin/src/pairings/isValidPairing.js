export const isValidPairing = (
  currentPairing,
  pairings,
  relationships,
  yearsToDisallow = 99
) => {
  const year = new Date().getFullYear();
  const yearThreshold = year - yearsToDisallow;
  const hasPreviousPairing = pairings
    .filter(pairing => pairing.year > yearThreshold)
    .some(pairing => {
      return (
        pairing.gifter === currentPairing.gifter &&
        pairing.giftee === currentPairing.giftee
      );
    });
  const isInRelationship = relationships.some(rel => {
    return (
      (rel.person1 === currentPairing.gifter &&
        rel.person2 === currentPairing.giftee) ||
      (rel.person2 === currentPairing.gifter &&
        rel.person1 === currentPairing.giftee)
    );
  });
  return !hasPreviousPairing && !isInRelationship;
};

export const allValidPairings = (
  currentPairings,
  pastPairings,
  relationships,
  yearsToDisallow = 99
) =>
  currentPairings.every(pairing =>
    isValidPairing(pairing, pastPairings, relationships, yearsToDisallow)
  );
