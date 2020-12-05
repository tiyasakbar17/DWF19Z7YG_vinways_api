const multer = require("multer");
const path = require("path");
const { uploadFailedResponse } = require("../response/Responses");

module.exports = {
  uploadFile: (image, audio) => {
    const storage = multer.diskStorage({
      destination: (req, file, callBack) => {
        console.log(file);
        callBack(null, "uploads");
      },
      filename: (req, file, callBack) => {
        const filename =
          md5(new Date()) +
          Math.floor(Math.random() * 1000) +
          data.files.file[0].detectedFileExtension;
        callBack(null, path.parse(filename));
      },
    });

    //Seleksi extension file
    const filterExtension = (req, file, callBack) => {
      console.log(file);
      if (file.fieldName === image) {
        if (
          !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)
        ) {
          req.errorMessege = {
            message: "Please select image files only",
          };
          return callBack(new Error("Please select image files only"), false);
        }
      }
      if (file.fieldName === audio) {
        if (
          !file.originalname.match(
            /\.(mp3|MP3|ogg|OGG|m4a|M4A|aac|AAC|flac|FLAC|wav|WAV)$/
          )
        ) {
          req.errorMessege = {
            message: "Please select audio files only",
          };
          return callBack(new Error("Please select audio files only"), false);
        }
      }
      callBack(null, true);
    };

    //Upload Multer
    const upload = multer({
      storage,
      filterExtension,
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
        if (!req.files && !error) {
          uploadFailedResponse(res, "No file selected");
        }

        if (error) {
          if (error.code === "LOMOT_FILE_SIZE") {
            uploadFailedResponse(res, "The file must be less than 5 Mb");
          }
        }
        return next();
      });
    };
  },
};
