export const calculateScore = (
  totalAverageWeightRatings: number,
  numberOfRents: number,
  recentlyActive: number,
) => {
  const W1 = 5;
  const W2 = 2;
  const W3 = 0.000001;
  return (
    totalAverageWeightRatings * W1 + numberOfRents * W2 + recentlyActive * W3
  );
};
