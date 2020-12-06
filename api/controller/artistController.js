const {
  failedResponse,
  successResponse,
  failedWithDetails,
} = require("../response/Responses");
const {
  getAllArtists,
  getArtistById,
  addArtist,
  editArtist,
  deleteArtist,
} = require("../services/artistServices");

module.exports = {
  getArtists: (req, res) => {
    getAllArtists((error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, results, "Artists Loaded", "artists");
      }
    });
  },
  getArtist: (req, res) => {
    getArtistById(req.params.id, (error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(
          res,
          results,
          `Artist with id ${req.params.id} is loaded`,
          "artist"
        );
      }
    });
  },
  addArtist: (req, res) => {
    addArtist(req.body, req.files, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          failedResponse(res, error);
        }
      } else {
        successResponse(res, results, "Artist Added", "artist", 201);
      }
    });
  },
  editArtist: (req, res) => {
    const data = { id: req.params.id, body: req.body, files: req.files };
    editArtist(data, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          failedResponse(res, error);
        }
      } else {
        successResponse(res, results, "Artist Edited", "artist", 201);
      }
    });
  },
  deleteArtist: (req, res) => {
    const data = req.params.id;
    deleteArtist(data, (error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, data, "Artist Deleted", "id");
      }
    });
  },
};
