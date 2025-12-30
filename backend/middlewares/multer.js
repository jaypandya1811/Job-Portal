const multer = require("multer");
const path = require("path");

let fullname = "jay pandya";
fullname = fullname
           .trim()
           .toLowerCase()
           .replace(/\s+/g, "_");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.resolve(process.cwd(),  "..","resumes"));
    },
    filename: (req,file,cb) => {
        let profile = String(req.body.profile);
        profile = profile
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "_");
        cb(
            null, fullname + "_" + profile + "_" + Date.now() + path.extname(file.originalname)
        );
    }
});

const uploadresume = multer({
    storage
});

module.exports = uploadresume;