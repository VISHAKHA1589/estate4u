// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport"; // Import Passport
import session from "express-session";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/userModel.js";
import connectDB from "./config/db.js"

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from 'cors';
import propertyRoutes from "./routes/propertyRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import bodyParser from "body-parser"

dotenv.config();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


// Setup session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google OAuth Strategy setup
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName
      });
      user.save(err => {
        if (err) console.error(err);
        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// Other routes
app.use('/api/upload', uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/properties", propertyRoutes);

// Serve static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));

app.use(bodyParser.json());

// API endpoint to handle form submissions
import nodemailer from 'nodemailer'; // Import nodemailer module

// API endpoint to handle form submissions
app.post('/send-email', async (req, res) => {
  const { name, email, phoneNumber, propertyOwner, propertyPhoneNumber, propertyName } = req.body; // Extract name, email, and phoneNumber from req.body

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'bidhimalakar@gmail.com', // Your email address
      pass: 'mwnv yyoe pklz mzwz' // Your email password
    }
  });

  // Send email
  try {
    await transporter.sendMail({
      from: 'bidhimalakar@gmail.com',
      to: 'bishakham3@gmail.com', // Owner's email address
      subject: 'New property inquiry',
      text: `Hi there, ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber} has just requested details about the property\nProperty Name: ${propertyName}\nProperty Owner: ${propertyOwner}\nOwner Contact Number: ${propertyPhoneNumber}`
    });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email');
  }
});


app.post('/send-enquiry-email', async (req, res) => {
  const { name, email, phoneNumber, message, category } = req.body; // Extract name, email, and phoneNumber from req.body

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'bidhimalakar@gmail.com', // Your email address
      pass: 'mwnv yyoe pklz mzwz' // Your email password
    }
  });

  // Send email
  try {
    await transporter.sendMail({
      from: 'bidhimalakar@gmail.com',
      to: 'bishakham3@gmail.com', // Owner's email address
      subject: 'New Property Inquiry',
      text: `Hi there,
        A new inquiry has just been made by:
        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Message: ${message}
        Category: ${category}
      `
    });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email');
  }
});






// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
