var User = require('../models/user');
var Patient = require('../models/patient')


module.exports = (app) => {
  // CREATE

  app.get('/portals', function (req, res) {

    if (req.user) {
        var id = req.user._id
        User.findById(req.user._id).then((cur_user) => {
          res.render('portal', { cur_user })
        }).catch((err) => {
          console.log(err.message)
        })
    } else {
        res.render('errorPage/401')
    }

  })


  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
    console.log(req.cookies)
  });

  app.get('/searchBy', (req, res) => {

    if (req.user) {

        Patient.findOne({firstname: req.query.fname, lastname: req.query.lname, dob: req.query.dob}).then((cur_patient) => {
            // res.render('show-patient', {patient, user: req.user})
            patientId = cur_patient._id
            // console.log(patientId)
            res.redirect(`/patients/` + patientId);
          }).catch((err) => {
              res.render('add-patient', {message: "This Patient Does Not Exist In Our DataBase"})
            console.log(err.message)
          })

    } else {
        res.render('errorPage/401', { message: "You are not authorized to search patients! Please log in."})
    }

  })

  app.get('/profile', function (req, res) {
    if (req.user) {
        User.findById(req.user._id).then((cur_user) => {
            let accountCreateDate = cur_user.createdAt.toDateString().split(' ')
            let cleanDate = accountCreateDate[1] + ' ' + accountCreateDate[2] + ' ' + accountCreateDate[3]
            console.log(cleanDate)
            res.render('profile', { cur_user, cleanDate })
        }).catch((err) => {
          console.log(err.message)
        })
    } else {
        res.render('errorPage/401', { message: "You are not logged in!"})
    }
  })

};
