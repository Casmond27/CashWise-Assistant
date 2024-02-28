const getRankInfo = (points) => {
  let rankImage, rankName, nextRankPoints;

  if (points >= 1000000) {
    rankImage = require('./../assets/diamond.jpg');
    rankName = 'Diamond';
    nextRankPoints = Infinity; // No next rank
  } else if (points >= 100000) {
    rankImage = require('./../assets/gold.jpg');
    rankName = 'Gold';
    nextRankPoints = 1000000;
  } else if (points >= 10000) {
    rankImage = require('./../assets/silver.jpg');
    rankName = 'Silver';
    nextRankPoints = 100000;
  } else if (points >= 1000) {
    rankImage = require('./../assets/bronze.jpg');
    rankName = 'Bronze';
    nextRankPoints = 10000;
  } else if (points >= 100) {
    rankImage = require('./../assets/iron.jpg');
    rankName = 'Iron';
    nextRankPoints = 1000;
  } else {
    rankImage = require('./../assets/wood.jpg');
    rankName = 'Wood';
    nextRankPoints = 100;
  }

  return { rankImage, rankName, nextRankPoints };
};

export { getRankInfo };
