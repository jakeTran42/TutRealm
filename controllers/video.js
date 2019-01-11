var Patient = require('../models/patient');


module.exports = (app) => {
  // CREATE

  app.get('/new/patient', function (req, res) {
    // var currentUser = req.user
    res.render('add-patient');
 })

   app.post('/patient', (req, res) => {
       // INSTANTIATE INSTANCE OF POST MODEL
       if (req.user) {
           var patient = new Patient(req.body);

           // SAVE INSTANCE OF POST MODEL TO DB
           patient.save((err, patient) => {
             // REDIRECT TO THE ROOT
             return res.redirect(`/patients/` + patient._id);
           })
       } else {
           res.render('errorPage/401')
       }
     });

};
