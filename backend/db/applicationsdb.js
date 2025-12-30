const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.catch(err => console.log(err));

const schema = mongoose.Schema({
    'j_id' : { type: mongoose.Schema.Types.ObjectId, required: [true,"job id is required"], ref: 'jobs' },
    'r_id' : { type: mongoose.Schema.Types.ObjectId, required: [true,"recruiter id is required"], ref: 'users' },
    'a_id' : { type: mongoose.Schema.Types.ObjectId, required: [true,"applicant id is required"], ref: 'users' },
    'applied_on' : { type: Date , default: Date.now() },
    'resume' : { type: String, required: [true,"resume is required"]},
    'status' : { type: String, default: "sent to recruiter"},
},
    { timestamps : true }
);

module.exports = mongoose.model('applications', schema);