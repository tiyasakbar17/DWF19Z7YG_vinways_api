const {
  failedResponse,
  successResponse,
  failedWithDetails,
} = require("../response/Responses");
const {
  getAllMusics,
  getMusicById,
  addMusicService,
  editMusicService,
  deleteMusicById,
} = require("../services/musicServices");

module.exports = {
  getMusics: (req, res) => {
    getAllMusics((error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, results, "Musics Loaded", "musics");
      }
    });
  },
  getMusic: (req, res) => {
    data = req.params.id;
    getMusicById(data, (error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, results, "Music Loaded", "music");
      }
    });
  },
  addMusic: (req, res) => {
    addMusicService(req, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          return failedResponse(res, error);
        }
      } else {
        successResponse(res, results, "Music Added", "music", 201);
      }
    });
  },
  editMusic: (req, res) => {
    editMusicService(req, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          failedResponse(res, error);
        }
      } else {
        successResponse(res, results, "Music Edited", "music");
      }
    });
  },
  deleteMusic: (req, res) => {
    const data = req.params.id;
    deleteMusicById(data, (error, results) => {
      if (error) {
        return failedResponse(res, error);
      } else {
        return successResponse(res, data, "Music Deleted", "id");
      }
    });
  },
};
