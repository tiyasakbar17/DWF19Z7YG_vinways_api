const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const { uploadFailedResponse } = require("../response/Responses");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "tiyasakbar",
  api_key: "655344582134876",
  api_secret: "eITB2ow0qDsXV9RIM-QBxh3jlMw",
});

exports.uploadFile = (image, audio) => {
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     if (file.fieldname === image) {
  //       console.log(file.buffer);
  //       cb(null, "uploads/img");
  //     }
  //     if (file.fieldname === audio) {
  //       console.log(file.buffer);
  //       cb(null, "uploads/audio");
  //     }
  //   },
  //   filename: (req, file, cb) => {
  //     const filename =
  //       md5(new Date()) +
  //       Math.floor(Math.random() * 1000) +
  //       path.extname(file.originalname);
  //     cb(null, filename);
  //   },
  // });

  let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });
  };

  //UPLOAD
  const loopImages = async (req, next) => {
    try {
      if (req.files.thumbnail) {
        let result = await streamUpload(req.files.thumbnail[0].buffer);
        req.files.thumbnail[0] = {
          ...req.files.thumbnail[0],
          filename: result.url,
        };
      }
      if (req.files.attachment) {
        let result = await streamUpload(req.files.attachment[0].buffer);
        req.files.attachment[0] = {
          ...req.files.attachment[0],
          filename: result.url,
        };
      }
      return next();
    } catch (error) {
      console.log(error);
    }
  };

  //Seleksi extension file
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === image) {
      const fileType = /jpeg|jpg|png|gif|svg/;
      if (!fileType.test(path.extname(file.originalname).toLowerCase())) {
        req.errorMessege = {
          message: "Wrong Type of File",
        };
        return cb(new Error("Wrong Type of File"), false);
      }
    }
    if (file.fieldname === audio) {
      const fileType = /mp3|ogg|aac|wav/;
      if (!fileType.test(path.extname(file.originalname).toLowerCase())) {
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
    // storage,
    fileFilter,
    limits: {
      fileSize: 5242880, //(Mb) => 5 x 1024 x 1024
    },
  }).fields([
    { name: image, maxCount: 1 },
    { name: audio, maxCount: 1 },
  ]);

  return (req, res, next) => {
    upload(req, res, (error) => {
      if (req.errorMessege) {
        uploadFailedResponse(res, req.errorMessege.message);
      }
      // if (!req.files && !error) {
      //   uploadFailedResponse(res, "No file selected");
      // }

      if (error) {
        if (error.code === "LIMIT_FILE_SIZE") {
          uploadFailedResponse(res, "The file must be less than 5 Mb");
        }
      }
      return loopImages(req, next);
    });
  };
};
