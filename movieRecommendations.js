const { calculateUserSimilarity } = require('./userSimilarity');

const getFallbackRecommendations = (averageRatings) => {
  const popularMovies = Object.keys(averageRatings).sort((a, b) => averageRatings[b] - averageRatings[a]);
  return popularMovies.slice(0, 5);
};

const getMovieRecommendations = (userName, cleanedData, averageRatings) => {
    const targetUser = userName.toLowerCase();

    // Find user ratings
    const userRatings = cleanedData
      .filter(entry => entry[0].toLowerCase() === targetUser)
      .reduce((ratings, entry) => {
        const [, movie, rating] = entry;
        ratings[movie] = parseFloat(rating);
        return ratings;
      }, {});
  
    if (Object.keys(userRatings).length === 0) {
      console.log(`No ratings found for user ${targetUser}.`);
      return getFallbackRecommendations(); // Fallback if no user ratings are found
    }
  
    // Calculate similarity scores with other users
    const similarityScores = {};
    cleanedData.forEach(entry => {
      const [user, movie, rating] = entry;
      if (user.toLowerCase() !== targetUser) {
        if (!averageRatings[movie]) {
          console.log(`No ratings found for movie ${movie} in the dataset.`);
          return;
        }
        if (!similarityScores[user]) {
          similarityScores[user] = 0;
        }
        similarityScores[user] += calculateUserSimilarity(userRatings, averageRatings[movie]);
      }
    });
  
    // Sort users by similarity score in descending order
    const sortedUsers = Object.keys(similarityScores).sort((a, b) => similarityScores[b] - similarityScores[a]);
  
    // Generate movie recommendations
    const recommendations = [];
    for (let i = 0; i < 5; i++) {
      const similarUser = sortedUsers[i];
      if (!similarUser) {
        console.log(`Not enough similar users found for recommendations.`);
        return getFallbackRecommendations(); // Fallback if not enough similar users are found
      }
      const moviesNotWatched = Object.keys(averageRatings[similarUser] || {})
        .filter(movie => !(movie in userRatings));
  
      recommendations.push(...moviesNotWatched);
    }
  
    return recommendations.slice(0, 5);
};
// Update getPersonalizedRecommendations function
const getPersonalizedRecommendations = (userName,cleanedData,averageRatings) => {
  const targetUser = userName.toLowerCase();
  const collaborativeRecommendations = getMovieRecommendations(targetUser,cleanedData,averageRatings);

  // If there are collaborative recommendations, return them; otherwise, use the fallback
  return collaborativeRecommendations.length > 0 ? collaborativeRecommendations : getFallbackRecommendations(averageRatings);
};

module.exports = {
  getMovieRecommendations,
  getPersonalizedRecommendations,
};
