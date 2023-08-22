const mongoose = require("mongoose");
const { Schema } = mongoose;
const { incrementVersion } = require("../utils/versionUtils");

const testSchema = new mongoose.Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      rquired: true,
    },
    requirementSetId: {
      type: Schema.Types.ObjectId,
      ref: "RequirementSet",
      required: true,
    },
    testSetName: {
      type: String,
      required: true,
    },
    // requirementSetName: {
    //     type: String,
    //     required: true
    // },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "IQ",
        "OQ",
        "PQ",
        "UAT",
        "FAT",
        "Integration Test",
        "Unit Tests",
        "Smoke Test",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "In Review", "Ready for Execution", "Approved"],
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    testscripts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testscript",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

testSchema.pre("save", function (next) {
  if (this.isNew) {
      this.version = incrementVersion(this.version);
  }
  next();
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
