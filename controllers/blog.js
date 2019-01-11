const Med = require('../models/medication')
const Patient = require('../models/patient')


module.exports = (app) => {

  // CREATE
  app.post('/patients/:patientId/medications', function (req, res) {

    if (req.user) {
        // INSTANTIATE INSTANCE OF MODEL
        const med = new Med(req.body)


        med.save().then((med) => {
          return Patient.findById(req.params.patientId)
        }).then((patient) => {
          patient.meds.unshift(med)
          return patient.save()
        }).then((patient) => {
          res.redirect(`/patients/` + patient._id)
        }).catch((err) => {
          console.log(err)
        })
    } else {
        res.render('errorPage/401')
    }


    // SAVE INSTANCE OF med MODEL TO DB
    // med.save().then((med) => {
    //   // REDIRECT TO THE ROOT
    //   return res.redirect(`/home`)
    // }).catch((err) => {
    //   console.log(err);
    // })
  })

};
