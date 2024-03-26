const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe'); // Ensure this model is already defined and imported

// Route to get all recipes for a specific user by userId
router.get('/recipes/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: 'Invalid user ID format' });
  }

  try {
    const recipes = await Recipe.find({ user: userId });
    if (recipes.length === 0) {
      return res.status(404).send({ message: 'No recipes found for this user' });
    }
    res.json(recipes);
  } catch (error) {
    console.error('Failed to retrieve recipes:', error);
    res.status(500).send({ message: 'Failed to retrieve recipes', error: error.message });
  }
});

module.exports = router;
