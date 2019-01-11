const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  createdAt:      { type: Date },

  blogName:       { type: String, required: true },
  content:         { type: String, required: true },
  poster:       { type: Number },
  reference:     { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: 'Pharmacist' }],
  tags:    { type: String, required: true },
})

MedSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.createdAt = now;
  next();
});

module.exports = mongoose.model('Med', MedSchema)
