const { Schema, model } = require("mongoose");

const plantSchema = new Schema({
  name: String,
  plantCategory: String,
  imageSrc: String,
  description: String,
  wateringWeekly: Number,
  plantSeason: String,
  petFriendly: Boolean,
});

const Plant = model("Plant", plantSchema);

module.exports = Plant;
