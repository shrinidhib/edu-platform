const Score = require('../models/scoreModel');

const createScore = async (req, res) => {
    const {marks,testID,userID} = req.body;
    try {
        const q = await Score.create( {marks: marks, testID: testID, userID: userID });
        return res.status(200).json(q);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
};

const getAllScores = async (req, res) => {
    try {
        const scores = await Score.find(); // Populate the testID field if necessary
        res.status(200).json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Error fetching scores' });
    }
};


const getScoresForUser = async (req, res) => {
    const userId = req.params.id; // Assuming userId is passed as a route parameter
  
    try {
      const scores = await Score.find({ userID: userId }).populate('testID'); // Populate the testID field if necessary
      res.status(200).json(scores);
    } catch (error) {
      console.error('Error fetching scores:', error);
      res.status(500).json({ error: 'Error fetching scores' });
    }
  };

  const getScoresForTest = async (req, res) => {
    const testId = req.params.testID;
 // Assuming testId is passed as a route parameter
  
    try {
        const scores = await Score.find({ testID: testId }); // Populate the userID field if necessary
        res.status(200).json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Error fetching scores' });
    }
};
  

module.exports = {
    createScore,
    getScoresForUser,
    getScoresForTest,
    getAllScores
};