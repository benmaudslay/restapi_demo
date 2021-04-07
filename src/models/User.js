const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw new Error("Password is wrong");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET, {
    expiresIn: "1 week",
  });

  console.log(token);
  // this.tokens.push({ token });
  // console.log(this.tokens);

  // await this.save();

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
