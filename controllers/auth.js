const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/signup', (req, res) => {
      res.render('reg-selection')
  });

  app.post('/sign-up', (req, res) => {
    // Create User
    const user = new User(req.body);

    user.save().then((user) => {
      var token = jwt.sign({ _id: user._id, type: user.type }, process.env.SECRET, { expiresIn: "60 days" });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/portals');
    }).catch((err) => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
  });

  app.get('/login', (req, res) => {
    res.render('login-form.hbs');
  });

  // LOGIN
  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find this user name
    User.findOne({ email }, 'email password').then((user) => {
      if (!user) {
        // User not found
        res.render('errorPage/401', { message: 'Wrong Email' });
        return res.status(401);
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          res.render('errorPage/401',{ message: "Wrong Password"});
          return res.status(401);
        }
        // Create a token
        const token = jwt.sign(
          { _id: user._id, email: user.email }, process.env.SECRET,
          { expiresIn: "60 days" }
        );
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/portals');
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}
