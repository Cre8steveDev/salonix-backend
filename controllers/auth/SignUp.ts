import { TSignupForm } from '../../types/types';
import type { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Users } from '../../models/models';

const SignUp = async (req: Request, res: Response) => {
  const { fullName, email, gender, phoneNumber, password } =
    req.body as TSignupForm;

  // Validate request body
  const bodyArray = [fullName, email, gender, phoneNumber, password];

  if (!bodyArray.every((item) => item.length >= 4))
    return res.status(400).json({
      message: 'BAD REQUEST. Please check the entry you submitted in the form',
    });

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // Create New User
    const newUser = new Users({
      fullName,
      email,
      gender,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();

    // Catch any error that may have occured
  } catch (error: any) {
    return res.status(403).json({ success: false, message: error!.message });
  }

  return res
    .status(201)
    .json({ success: true, message: 'User Account created successfully.' });
};

export default SignUp;
