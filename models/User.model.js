const { Schema, model } = require("mongoose");

const UserPlant = require('./UserPlant.model')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  plants: [{type: Schema.Types.ObjectId, ref: UserPlant}]
  //favorite:plants to be
});

const User = model("User", userSchema);

module.exports = User;
