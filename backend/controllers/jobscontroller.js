const model = require('../db/jobsdb');
const savedjobsmodel = require('../db/savedjobs');

exports.addjob = async (req,res) => {
    try{
        await model.create(req.body);
        return res.status(201).json({ message : "Job added successfully" })
    } catch(err) {
        return res.status(500).json({ error : err.message })
    }
};

exports.savejob = async (req,res) => {
    try{
        const aid = req.body.a_id;
        const jid = req.body.j_id;
        const issaved = await savedjobsmodel.findOne({ a_id : aid, j_id : jid });
        if(issaved){
            return res.status(406).json({ message : "Job is already saved" })
        }
        await savedjobsmodel.create(req.body);
        return res.status(201).json({ message : "Job saved successfully" })
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error : err.message })
    }
};

exports.viewsavedjobs = async (req,res) => {
    try{
        const id = req.params.id;
        const job = await savedjobsmodel.find({ a_id : id })
                    .populate("j_id","company_name job_title website_url job_type salary location graduation experience");
        return res.status(200).json(job)
    } catch(err) {
        return res.status(500).json({ error : err.message })
    }
};

exports.viewjobrecruiter = async (req,res) => {
    try{
        const job = await model.find({ r_id : req.params.id })
        return res.status(200).json(job)
    } catch(err) {
        return res.status(500).json({ error : err.message })
    }
};

exports.viewjobs = async (req,res) => {
    try{
        const job = await model.find()
        return res.status(200).json(job)
    } catch(err) {
        return res.status(500).json({ error : err.message })
    }
};

exports.viewjobdetails = async (req,res) => {
    try{
        const id = req.params.id;
        const job = await model.findOne({ _id : id })
        return res.status(200).json(job)
    } catch(err) {
        return res.status(500).json({ error : err.message })
    }
};

exports.deletejob = async (req,res) => {
    try{
        await model.deleteOne({ r_id : req.params.id })
        return res.status(204).json({"message" : "deleted"})
    } catch(err) {
        return res.status(500).json({ error : err.message })
    }
};

exports.searchjob = async (req,res) => {
    try{
        const q = req.query?.q || req.query.query;
        const jobs = await model.find(
            { $text: { $search : q } }
        )
        return res.status(200).json(jobs)
    } catch(err){
        console.log("err");
        return res.status(500).json({ error : err.message })
    }
}; 