const fs = require('fs');

const readMovieData = () => {
  const rawData = fs.readFileSync('./data.txt', 'utf8');
  const cleanedData = rawData
    .split('\n')
    .map((line) => line.split(','))
    .map((entry) => entry.map((item) => item.trim()))
    .filter((entry) => entry.length === 3 && !isNaN(entry[2]));

  return cleanedData;
};

const calculateAverageRatings = (cleanedData) => {
  const movieRatings = {};
  cleanedData.forEach((entry) => {
    const [, movie, rating] = entry;
    if (!movieRatings[movie]) {
      movieRatings[movie] = [];
    }
    movieRatings[movie].push(parseFloat(rating));
  });

  const averageRatings = {};
  Object.keys(movieRatings).forEach((movie) => {
    const ratings = movieRatings[movie];
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    averageRatings[movie] = averageRating;
  });

  return averageRatings;
};

module.exports = {
  readMovieData,
  calculateAverageRatings,
};
