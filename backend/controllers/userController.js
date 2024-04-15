const User = require('../models/userModel')
const mongoose=require('mongoose')

const getUser=async(req,res)=>{
    const userId = req.params.id;
    console.log(userId)

    try {
        const user = await User.findById( userId ); // Populate the testID field if necessary
        
        res.status(200).json(user);
      } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Error fetching scores' });
    }
}






module.exports = { getUser }