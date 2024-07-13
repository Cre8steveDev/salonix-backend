import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_SECRET } from '../config';
import { Users } from '../models/models';
import { NewRequest } from '../types/types';

// Define verifyUser Middleware for protected routes
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const userAuthorization = req.headers.authorization?.split(' ')[1];

  //  If there's no authorization in the header return error
  if (!userAuthorization) {
    return res.status(401).json({
      success: false,
      message: 'User not authorized.',
    });
  }

  //   Try to verify the authorization that was given
  jwt.verify(userAuthorization, COOKIE_SECRET!, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized. Please Sign In.',
      });
    }
    // if the token has expired, return unauthorized
    const currentTime = new Date().getTime();

    // @ts-ignore
    if (payload && currentTime > payload.tokenExpiry) {
      return res.status(401).json({
        success: false,
        message: 'Session has expired',
      });
    }
    // Verify that the user id is a valid registered user
    const { id } = payload as jwt.JwtPayload;
    const isValidUser = await Users.findById(id);

    // append the tokenPayload to the request object
    if (isValidUser) {
      // @ts-ignore
      req.tokenData = payload;
      // @ts-ignore
      req.user = isValidUser;
    }
    //   if all goes well
    next();
  });
};

export default verifyUser;
