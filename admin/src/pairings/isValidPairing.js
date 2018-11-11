export const isValidPairing = (currentPairing, pairings, relationships) => {
  const hasPreviousPairing = pairings.some(pairing => {
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
  relationships
) =>
  currentPairings.every(pairing =>
    isValidPairing(pairing, pastPairings, relationships)
  );
