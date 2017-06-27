var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GardinSchema = new Schema({
  plants: [
    {
      type: Schema.Types.ObjectId,
      ref: "plant"
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]
});

module.exports = mongoose.model("gardin", GardinSchema);
