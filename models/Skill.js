const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema(
  {
    name: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
