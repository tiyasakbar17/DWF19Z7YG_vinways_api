const { Artists } = require("../../models");
const Joi = require("joi");

module.exports = {
  getAllArtists: async (callBack) => {
    try {
      const artistLists = await Artists.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
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
      const selectedArtist = await Artists.findOne({
        where: {
          id: data,
        },
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
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
        const newArtist = await Artists.create(dataArtist);
        const { id, name, old, category, startCareer, thumbnail } = newArtist;

        if (!newArtist) {
          callBack("Can't Add Artist, Please Try Again");
        } else {
          callBack(null, { id, name, old, category, startCareer, thumbnail });
        }
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  editArtist: async (data, callBack) => {
    const { id, body, files } = data;
    try {
      const artistCalled = await Artists.findOne({
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
          startCareer: Joi.date(),
          thumbnail: Joi.string(),
        });

        const newArtistData = {
          ...body,
          thumbnail: files.thumbnail
            ? files.thumbnail[0].filename
            : artistCalled.newArtistDatathumbnail,
        };

        const { error } = schema.validate(newArtistData, { abortEarly: false });

        if (error) {
          callBack(error);
        } else {
          const artistUpdated = await Artists.update(newArtistData, {
            where: { id },
          });
          if (!artistUpdated) {
            callBack("Please Try Again");
          } else {
            const result = await Artists.findOne({
              where: { id },
              attributes: {
                exclude: ["createdAt", "updatedAt", "artistId"],
              },
            });
            callBack(null, result);
          }
        }
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  deleteArtist: async (data, callBack) => {
    try {
      const deletedArtist = await Artists.destroy({ where: { id: data } });
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
