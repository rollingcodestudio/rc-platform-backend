import express from 'express';
const router = express.Router();
import { admin, firebase } from '../../firebase-services/initializer/initializeApp';


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


router.post('/signin', async (req, res) => {

  try {

    const { email, password } = req.body;

    if(!email.trim() || !password.trim()){
      res.status(500).json({
        code: "auth/failed-authenticate",
        message: 'Ocurrió un problema al momento de iniciar el login, por favor vuelva a intentarlo',
        accessToken: null
      });
      return
    }

    const auth = await firebase.auth().signInWithEmailAndPassword(email, password);

    if (!auth.user.uid) {
      res.status(500).json({
        code: "auth/failed-authenticate",
        message: 'Ocurrió un problema al momento de iniciar el login, por favor vuelva a intentarlo',
        accessToken: null
      });
    }

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const idToken = await firebase.auth().currentUser.getIdToken();
        if (!idToken) {
          res.status(500).json({
            code: "auth/failed-authenticate",
            message: 'Ocurrió un problema al momento de iniciar el login, por favor vuelva a intentarlo',
            accessToken: null,
            
          });
        }
        res.status(200).json({
          code: "auth/successful-authentication",
          message: 'Usuario logueado exitósamente',
          accessToken: idToken,
          userProfile: user.providerData[0]
        })
      }
    });
  }
  catch (error) {
    res.status(500).send(error);
  }

});

module.exports = router;