var User = require('../models/user');

module.exports = {
    checkType: (userId) => {
        // If user exists as pharmacist type
        User.findById(userId).then((user) => {
          return userId.type ? "isPharmacist" : "notPharmacist"
        })
    }
}
