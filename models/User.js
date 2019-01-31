const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  firstname : String,
  lastname : String,
  accountType : { type : String, enum : ["ironhacker","enterprise"]},
  companyName : {
    type: String,
    default: 'Acme'
  },
  image : String,
  skills : [{ type: Schema.ObjectId, ref: "Skill" }],
  experiences : [String],
  resume : String,
  linkedinProfile : String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
