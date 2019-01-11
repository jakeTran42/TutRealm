const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  createdAt       : { type: Date },
  updatedAt       : { type: Date },
  password        : { type: String, select: false },
  firstname       : { type: String, required: true },
  lastname        : { type: String, required: true },
  email           : { type: String, required: true },
  address         : { type: String, required: true },
  phoneNumber     : { type: String, required: true },
  NPI             : { type: Number, required: true },
  DEA             : { type: Number, required: true },
  HIN             : { type: Number, required: false },
  licenseNumber   : { type: Number, required: false },
  dob             : { type: Date, required: false },
  type            : { type: String, required: true }

});

// Define the callback with a regular function to avoid problems with this
UserSchema.pre('save', function(next){
    // SET createdAt AND updatedAt
    let now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        this.createdAt = now;
    }

    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    // Salting
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

// Comparing the password as a method
UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
