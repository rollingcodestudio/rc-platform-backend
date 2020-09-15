import { admin } from '../../../firebase-services/initializer/initializeApp';

export const verifyIdToken = async (req, res, next) => {

    try {
        const idToken = req.headers['x-access-token'];
        const decodedToken = await admin.auth().verifyIdToken(idToken);
       
      if(decodedToken){
        next();
      }
    } catch (error) {
       res.status(500).send(error)
    }
}

