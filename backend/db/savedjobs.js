const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.catch(err => console.log(err));

const schema = mongoose.Schema({
    'j_id' : { type: mongoose.Schema.Types.ObjectId, required: [true,"job id is required"], ref: 'jobs' },
    'a_id' : { type: mongoose.Schema.Types.ObjectId, required: [true,"user id is required"], ref: 'users' },
},
    { timestamps : true }
);

module.exports = mongoose.model('savedjobs', schema);