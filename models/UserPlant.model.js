const { Schema, model } = require("mongoose");
const User = require('./User.model')
const Plant = require('./Plant.model')


const userPlantSchema = new Schema({
    name: String,
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    plantType: {type: Schema.Types.ObjectId, ref: "Plant"},
    location: String,
    lastWatering: {type: String, format: Date},
    nextWatering: {type: String, format: Date},
    comments: String,
});

const UserPlant = model("UserPlant", userPlantSchema);

module.exports = UserPlant;

//  lastWatering: Date, 