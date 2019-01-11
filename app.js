require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path');
var methodOverride = require('method-override')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const hbs = require('express-handlebars');

app.engine('hbs', hbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs')
app.use(express.static(__dirname));
app.use(express.static('./public'));
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/RxControl');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(cookieParser());

var checkAuth = (req, res, next) => {
  // console.log("Checking authentication");
  // console.log(req.user)
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
    console.log('Invalid user')
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}
app.use(checkAuth);


// Index Navigation
app.get('/', (req, res) => {
  currentUser = req.user
    res.render('index', {currentUser})
});

app.get('/new/pharmacist', (req, res) => {
    res.render('phar-reg-form')
});

app.get('/new/doctor', (req, res) => {
    res.render('doc-reg-form')
});


// require('./controllers/medications.js')(app);
// require('./controllers/patients.js')(app);
// require('./controllers/viewpatients.js')(app);
// require('./controllers/auth.js')(app);
// require('./controllers/portals.js')(app);

app.listen(process.env.PORT || 3000, function(){
    console.log('Portfolio App listening on port 3000!')
})
