const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");

//  Path to the uploads folder
const uploadDir = path.join(__dirname, "..", "uploads");

// // Ensure the folder exists (async)
async function ensureUploadDirExists() {
  try {
    await fs.access(uploadDir); // Check if it exists
  } catch (error) {
    // If not, create it
    await fs.mkdir(uploadDir);
  }
}

//  folder check function called
ensureUploadDirExists();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
     storage,
    fileFilter: function(req, file, cb){
    const allowed =['image/jpeg', 'image/jpg', 'image/png'];

    if(!allowed.includes(file.mimetype)){
        return cb(new Error("Only jpeg and png files are allowed"))
    }
    cb(null, true)
    }
 });

module.exports = upload;
