import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// import env variables
import { PORT, COOKIE_SECRET, SESSION_SECRET } from './config';

// Helper Functions
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import connectDB from './mongoose';

// import Routers
import authRouter from './routes/authRoute';
import serviceRouter from './routes/appResources';
import appointmentsRouter from './routes/appointments';

const app = express();
const port = PORT || 3000;
const secret = COOKIE_SECRET;
const session_secret = SESSION_SECRET;

// Register middlewares on the app instance
app.use(cors());
app.use(cookieParser(secret));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware on the app instance
// This is not exactly doing anything as
// I'm handling sessions using jwt
app.use(
  session({
    secret: session_secret!,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 6000 * 7000 * 2 }, //almost 24 hours
  })
);

// Create health check route
app.get('/health', (req: Request, res: Response) => {
  res.send('Yuuup! Server still up and running 😄');
});

// Add route handlers as middleware
app.use('/api/auth', authRouter);
app.use('/api/resources', serviceRouter);
app.use('/api/appointments', appointmentsRouter);

// Connect the Database and Start The Server on Success
connectDB().then((response) => {
  if (response)
    return app.listen(port, () =>
      console.log('Serveris running on port: ', port)
    );

  // If database connection fails
  console.log('Error occured');
  process.exit();
});
