const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.catch(err => console.log(err));

const schema = mongoose.Schema({
    'r_id' : { type: mongoose.Schema.Types.ObjectId, required: [true,"recruiter id is required"], ref: 'users' },
    'company_name' : { type: String, required: [true,"company name is required"]},
    'website_url' : { type: String, required: [true,"website url name is required"]},
    'job_title' : { type: String, required: [true,"job title is required"]},
    'job_type' : { type: String, required: [true,"job type is required"]},
    'salary' : { type: String },
    'experience' : { type: String, required: [true,"Experience is required"]},
    'mode' : { type: String, required: [true,"mode is required"] },
    'location' : { type: String, required: [true,"location is required"]},
    'company_info' : { type: String },
    'benefits' : { type: String },
    'graduation' : { type: String, required: [true,"graduation is required"]},
    'requirements' : { type: String, required: [true,"requirements is required"]},
    'job_description' : { type: String, required: [true,"job description is required "] },
    'remark' : { type: String },
    'status' : { type: String, default: "Active",required: [true,"status is required"] },
},
    { timestamps : true }
);

module.exports = mongoose.model('jobs', schema);