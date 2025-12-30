const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.catch(err => console.log(err));

const schema = mongoose.Schema({
    'fullname' : { type: String, required: [true,"fullname is required"]},
    'email' : { type: String, required: [true,"email is required"], unique: true },
    'phone' : { type: String, required: [true,"phone number is required"], unique: true },
    'role' : { type: String, required: [true, "you have to tell whether your applicant or recruiter"]},
    'profile' : { type: String, required: [true,"Job profile is required"]},
    'resume' : { type: String },
    'password' : { type: String, required: [true,"password is required"]},
},
    { timestamps : true }
);

module.exports = mongoose.model('users', schema);