const { Schema, model } = require("mongoose");

const plantSchema = new Schema({
  name: String,
  category: String,
  imageSrc: String,
  description: String,
  lightExposure: String,
  wateringWeekly: Number,
  petFriendly: Boolean,
});

const Plant = model("Plant", plantSchema);

module.exports = Plant;
