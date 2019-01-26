const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  owner : [{ type: Schema.ObjectId, ref: "User" }],
  category : { type : string, enum : ["Front-end","Back-end","FullStack","UX design","Data Analyst"]},
  summary : String,
  skills : [{ type: Schema.ObjectId, ref: "Skill" }],
  duration : { type : string, enum : ["Moins d'un mois", "D'un à trois mois", "De trois à six mois", "Plus de six mois"]},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;