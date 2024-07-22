import { Router } from 'express';
import SignUp from '../controllers/auth/SignUp';
import SignIn from '../controllers/auth/SignIn';
import verifyUser from '../middleware/verifyUser';

// Extended Request Interface
import refreshToken from '../controllers/auth/RefreshToken';
import getWallet from '../controllers/auth/getWallet';
import updateWallet from '../controllers/auth/updateWallet';

//  Instantiate Auth Router
const router = Router();

// AUTHORIZATION RELATED ROUTES
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/refresh-token', verifyUser, refreshToken);
router.get('/get-wallet', verifyUser, getWallet);
router.post('/update-wallet', verifyUser, updateWallet);

// Return API Key for Paystack Payment
router.get('/get-api-key', verifyUser, (req, res) => {
  return res.status(200).json({ apiKey: process.env.PAYSTACK_KEY });
});

export default router;
