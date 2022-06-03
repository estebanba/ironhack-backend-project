const { Schema, model } = require("mongoose");
const User = require('./User.model')
const Plant = require('./Plant.model')


const userPlantSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    plantType: {type: Schema.Types.ObjectId, ref: "Plant"},
    nextWaterTime: Date,
});

const UserPlant = model("UserPlant", userPlantSchema);

module.exports = UserPlant;