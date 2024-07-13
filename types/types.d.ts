// import { ObjectId } from 'mongodb';

import { Document } from 'mongoose';
import { Request } from 'express';
import { Users } from '../models/models';

interface User extends Document {
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
  gender: string;
}
export type TokenData = { id: string; tokenExpiry: number; iat: number };

export interface NewRequest extends Request {
  tokenData: TokenData;
  user: Users;
}

export type TSignupForm = {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
};

export type TSigninForm = {
  email: string;
  password: string;
};
