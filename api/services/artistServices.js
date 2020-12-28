const { artist, song, like } = require("../../models");
const Joi = require("joi");

module.exports = {
  getAllArtists: async (callBack) => {
    try {
      const artistLists = await artist.findAll({
        attributes: { exclude: ["updatedAt"] },
      });
      if (!artistLists) {
        callBack("No Artists Found");
      } else {
        callBack(null, artistLists);
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  getArtistById: async (data, callBack) => {
    try {
      const selectedArtist = await artist.findOne({
        where: {
          id: data,
        },
        attributes: { exclude: ["updatedAt"] },
        include: [
          {
            model: song,
            as: "songs",
            attributes: { exclude: ["updatedAt"] },
            order: [["id", "DESC"]],
            include: [
              {
                model: like,
                as: "likedBy",
                attributes: { exclude: ["updatedAt"] },
              },
            ],
          },
        ],
      });
      if (!selectedArtist) {
        callBack("Artist Not Found");
      } else {
        callBack(null, selectedArtist);
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  addArtist: async (data, file, callBack) => {
    try {
      const schema = Joi.object({
        name: Joi.string().min(2).required(),
        old: Joi.number().required(),
        category: Joi.string().required(),
        startCareer: Joi.date().required(),
        thumbnail: Joi.string().required(),
      });
      const dataArtist = {
        ...data,
        thumbnail: file.thumbnail ? file.thumbnail[0].filename : null,
      };

      const { error } = schema.validate(dataArtist, { abortEarly: false });

      if (error) {
        callBack(error);
      } else {
        const newArtist = await artist.create(dataArtist);
        if (!newArtist) {
          callBack("Can't Add Artist, Please Try Again");
        } else {
          callBack(null, "Artist Added");
        }
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  editArtist: async (data, callBack) => {
    const { id } = data.params;
    const { body, files } = data;
    try {
      const artistCalled = await artist.findOne({
        where: {
          id,
        },
      });
      if (!artistCalled) {
        callBack("User Not Found");
      } else {
        const schema = Joi.object({
          name: Joi.string().min(2),
          old: Joi.number(),
          category: Joi.string(),
          startCareer: Joi.number(),
          thumbnail: Joi.string(),
        });

        const newArtistData = {
          ...body,
          thumbnail: files.thumbnail
            ? files.thumbnail[0].filename
            : artistCalled.thumbnail,
        };

        const { error } = schema.validate(newArtistData, { abortEarly: false });

        if (error) {
          callBack(error);
        } else {
          const artistUpdated = await artist.update(newArtistData, {
            where: { id },
          });
          if (!artistUpdated) {
            callBack("Please Try Again");
          } else {
            callBack(null, "Artist Edited");
          }
        }
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  deleteArtist: async (data, callBack) => {
    try {
      const deletedArtist = await artist.destroy({
        where: { id: data },
      });
      if (!deletedArtist) {
        callBack("User tidak ditemukan");
      } else {
        callBack(null, "success");
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
};
