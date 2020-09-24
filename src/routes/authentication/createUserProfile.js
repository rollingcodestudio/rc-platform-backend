import e from 'express';
import express from 'express';
const router = express.Router();
import database from '../../database/database';
import CreateUserProfile from '../../models/CreateUserProfile';


router.post('/createUserProfile', async (req, res) => {

  try {

    const { firstName, lastName, email, profilePhoto, state } = req.body

    if (!firstName || !lastName || !email || !profilePhoto) {
      res.status(404).json({
        errorCode: 'incomplete-data',
        message: 'All data is required'
      })
    }

    const createProfile = new CreateUserProfile({
      firstName,
      lastName,
      email,
      profilePhoto,
      state
    });

    await createProfile.save();

    res.status(200).json({
      errorCode: 'user-profile-created',
      message: 'User profile created successfully',
      userProfile: createProfile
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


module.exports = router;