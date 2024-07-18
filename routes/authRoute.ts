import { Router } from 'express';
import SignUp from '../controllers/auth/SignUp';
import SignIn from '../controllers/auth/SignIn';
import verifyUser from '../middleware/verifyUser';

// Extended Request Interface
import { NewRequest } from '../types/types';
import refreshToken from '../controllers/auth/RefreshToken';
import getWallet from '../controllers/auth/getWallet';

//  Instantiate Auth Router
const router = Router();

// AUTHORIZATION
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/refresh-token', verifyUser, refreshToken);
router.get('/get-wallet', verifyUser, getWallet);

// Testing Protected Routes
router.get('/protected', verifyUser, (req, res) => {
  // Retrieve token from  verification
  const { tokenData } = req as NewRequest;

  if (!tokenData)
    return res.status(401).json({
      success: false,
      message: 'User not authorized to access the resource.',
    });

  return res.json({ message: 'User is authorized here.' });
});

export default router;
