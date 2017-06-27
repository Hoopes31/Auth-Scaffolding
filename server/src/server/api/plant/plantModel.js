var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlantSchema = new Schema({
  plantName: {
    type: String,
    required: true
  },
  plantType: {
    type: String,
    required: true
  },
  waterSchedule: {
    waterDate: {
      type: Date,
      default: Date.now
    },
    waterFrequency: {
      type: Number,
      default: 7
    }
  },
  feedSchedule: {
    feedDate: {
      type: Date,
      default: Date.now
    },
    feedFrequency: {
      type: Number,
      default: 30
    }
  },
  gardinID: {
    type: Schema.Types.ObjectId,
    ref: "gardin",
    required: true
  }
});

module.exports = mongoose.model("plants", PlantSchema);
