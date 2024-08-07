import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

let mongoURI = process.env.MONGO_URI;
let cookieSecret = process.env.COOKIE_SECRET;

let router = express();
const mongoOptions = {
  retryWrites: true,
  w: "majority",
  tls: true,
  tlsInsecure: false,
  // tlsAllowInvalidCertificates: true
};

mongoose.connect(mongoURI, mongoOptions)
  .then((data) => {
    console.log('Connected to MongoDB successfully');
    setupMiddleware();
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB: ', error);
  })



function setupMiddleware() {
  router.use(express.json());
  router.use(cookieParser(cookieSecret));
  router.use(
    session({
      secret: cookieSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
      },
      store: MongoStore.create({
        mongoUrl: mongoURI,
        ttl: 14 * 24 * 60 * 60 // 14 days
      }),
    })
  );

  router.use(passport.initialize());
  router.use(passport.session());

  router.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    res.status(200).send('Hello from the home route!');
  });
}

export default router;