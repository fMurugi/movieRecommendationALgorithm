const readline = require('readline');
const { readMovieData, calculateAverageRatings } = require('./movieData');
const { getPersonalizedRecommendations } = require('./movieRecommendations');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const entry = () => {
  const cleanedData = readMovieData();
  const averageRatings = calculateAverageRatings(cleanedData);

  rl.question('Enter your name: ', (userName) => {
    const recommendations = getPersonalizedRecommendations(userName, cleanedData, averageRatings);
    console.log(`Hello, ${userName}! Here are your personalized movie recommendations:`, recommendations);
    rl.close();
  });
};

entry();
