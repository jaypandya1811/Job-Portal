const model = require('../db/applicationsdb');

exports.addapplication = async (req, res) => {
  try {
    const aid = req.body.a_id;
    const jid = req.body.j_id;
    const isapplied = await model.findOne({ a_id : aid, j_id : jid });
    if(isapplied){
      return res.status(406).json({ message : "Already applied for this job" })
    }
    await model.create(req.body);
    return res.status(201).json({ message: "successfully applied" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteapplication = async (req, res) => {
  try {
    console.log(req.params.id);
    const q = await model.findByIdAndDelete(req.params.id);
    console.log(q);
    return res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.viewapplicationrecruiter = async (req,res) => {
    try{
        const application = await model.find({ r_id : req.params.id })
                            .populate("a_id","fullname email phone resume profile");
        console.log(application);
        return res.status(200).json(application)
    } catch(err) {
        return res.status(500).json(err.message)
    }
};

exports.viewapplicationapplicant = async (req,res) => {
    try{
        const application = await model.find({ a_id : req.params.id })
                            .populate("j_id","company_name job_title website_url");
        return res.status(200).json(application)
    } catch(err) {
        return res.status(500).json(err.message)
    }
};