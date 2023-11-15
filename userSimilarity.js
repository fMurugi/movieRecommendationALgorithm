const calculateUserSimilarity = (user1, user2) => {
    const commonMovies = Object.keys(user1).filter(movie => user2[movie]);
  
    if (commonMovies.length === 0) {
      return 0; // No common movies, similarity is zero
    }
  
    const sumProducts = commonMovies.reduce((sum, movie) => sum + user1[movie] * user2[movie], 0);
    const sumSquaresUser1 = commonMovies.reduce((sum, movie) => sum + Math.pow(user1[movie], 2), 0);
    const sumSquaresUser2 = commonMovies.reduce((sum, movie) => sum + Math.pow(user2[movie], 2), 0);
  
    const similarity = sumProducts / (Math.sqrt(sumSquaresUser1) * Math.sqrt(sumSquaresUser2));
    return similarity;
  };
  
  module.exports = {
    calculateUserSimilarity,
  };
  