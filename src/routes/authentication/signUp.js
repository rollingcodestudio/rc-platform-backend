import express from 'express';
const router = express.Router();
import { admin } from '../../firebase-services/initializer/initializeApp';

//Here are the routes to register a user, log in with a user and log out

// Register user
router.post('/signup', async (req, res) => {

  try {

    const { email, password, displayName } = req.body;

    const userRecord = await admin.auth().createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: displayName,
      disabled: false
    })

    if (!userRecord.uid) {
      res.status(500).json({
        code: "auth/user-record-failed",
        message: 'Ocurrió un error al crear el nuevo usuario, por favor vuelva a intentarlo'
      });
    }
    res.status(200).json({
      code: "auth/user-record-successful",
      message: 'Usuario creado exitósamente'
    });
  }
  catch (error) {
    res.status(500).send(error);
  }

});


module.exports = router;