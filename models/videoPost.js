const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = new Schema({
  firstname:    { type: String, required: true },
  lastname:     { type: String, required: true },
  dob:          { type: Date, required: true },
  meds:         [{ type: Schema.Types.ObjectId, ref: 'Med' }]
})

module.exports = mongoose.model('Patient', PatientSchema)
