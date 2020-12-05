const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const { uploadFailedResponse } = require("../response/Responses");

module.exports = {
  uploadFile: (image, audio) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "/uploads");
      },
      filename: (req, file, cb) => {
        const filename =
          md5(new Date()) +
          Math.floor(Math.random() * 1000) +
          path.extname(file.originalname);
        cb(null, filename);
      },
    });

    //Seleksi extension file
    const fileFilter = (req, file, cb) => {
      console.log(file);
      if (file.fieldName === image) {
        const fileType = /jpeg|jpg|png|gif|svg/;
        if (!fileType.test(file.detectedFileExtension.toLowerCase())) {
          req.errorMessege = {
            message: "Wrong Type of File",
          };
          return cb(new Error("Wrong Type of File"), false);
        }
      }
      if (file.fieldName === audio) {
        const fileType = /mp3|ogg|aac|wav/;
        if (!fileType.test(file.detectedFileExtension.toLowerCase())) {
          req.errorMessege = {
            message: "Wrong Type of File",
          };
          return cb(new Error("Wrong Type of File"), false);
        }
      }
      cb(null, true);
    };

    //Upload Multer
    const upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: 5242880, //(Mb) => 5 x 1024 x 1024
      },
    }).fields([
      { name: image, maxCount: 1 },
      { name: audio, maxCount: 1 },
    ]);

    return (req, res, next) => {
      // console.log(upload);
      upload(req, res, (error) => {
        if (req.errorMessege) {
          uploadFailedResponse(res, req.errorMessege.message);
        }
        if (!req.files && !error) {
          uploadFailedResponse(res, "No file selected");
        }

        if (error) {
          if (error.code === "LIMIT_FILE_SIZE") {
            uploadFailedResponse(res, "The file must be less than 5 Mb");
          }
        }
        return next();
      });
    };
  },
};
