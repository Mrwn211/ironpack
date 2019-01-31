const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const skillSchema = new Schema({
  name: { type : string, enum : ["ReactJS","NodeJS","HTML5","CSS3","Javascript","Python","VueJS","UX Design","Data","Other"]}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;