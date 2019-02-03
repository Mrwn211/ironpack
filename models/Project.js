const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: String,
    owner: { type: Schema.ObjectId, ref: "User" },
    category: [
      {
        type: String,
        enum: [
          "Front-end",
          "Back-end",
          "FullStack",
          "UX-design",
          "Data-Analyst"
        ]
      }
    ],
    summary: String,
    skills: [{ type: Schema.ObjectId, ref: "Skill" }],
    duration: [
      {
        type: String,
        enum: [
          "Less than a month",
          "Up to 3 months",
          "From 3 to 6 months",
          "More than 6 months"
        ]
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
