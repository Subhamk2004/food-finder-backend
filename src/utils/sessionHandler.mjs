import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import express from 'express';

let databaseName = 'FoodFinder'
let mongoURI = `mongodb+srv://subhamrahar22:HsnrYatHXhtSeKzw@foodfinder.xrb4b70.mongodb.net/${databaseName}`;

const mongoOptions = {
    retryWrites: true,
    w: "majority",
    tls: true,
    tlsInsecure: false,
    // tlsAllowInvalidCertificates: true
  };
  let mongoConnect = () => {
    mongoose.connect(mongoURI, mongoOptions)
      .then((data) => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((error) => {
        console.log('Failed to connect to MongoDB: ', error);
      }) 
  }

  mongoConnect();

let router = express();
router.use(express.json());
router.use(cookieParser('CookieSecret'));
router.use(
    session({
        secret: "FoodFinderCookieSecretComplex",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    })
)

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    
    
    res.status(200).send('Hello from the home route!');
})

export default router;