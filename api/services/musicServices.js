const { song, artist, like, playlistsong } = require("../../models");
const Joi = require("joi");

module.exports = {
  getAllMusics: async (callBack) => {
    try {
      const allMusics = await song.findAll({
        attributes: {
          exclude: ["updatedAt"],
        },
        include: [
          {
            model: artist,
            as: "artist",
            attributes: {
              exclude: ["updatedAt"],
            },
          },
          {
            model: like,
            as: "likedBy",
            attributes: {
              exclude: ["updatedAt"],
            },
          },
        ],
      });
      if (!allMusics.length) {
        return callBack("Musics Empty");
      } else {
        return callBack(null, allMusics);
      }
    } catch (error) {
      callBack(error);
    }
  },
  getMusicById: async (data, callBack) => {
    try {
      const music = await song.findOne({
        where: {
          id: data,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "artistId"],
        },
        include: [
          {
            model: artist,
            as: "artist",
            attributes: {
              exclude: ["updatedAt"],
            },
          },
          {
            model: like,
            as: "likedBy",
            attributes: {
              exclude: ["updatedAt"],
            },
          },
        ],
      });
      if (!music) {
        return callBack(`Music with id ${data} is not found`);
      } else {
        callBack(null, music);
      }
    } catch (error) {
      callBack(error);
    }
  },
  addMusicService: async (data, callBack) => {
    const { body, files } = data;
    try {
      const schema = Joi.object({
        title: Joi.string().required(),
        artistId: Joi.number().required(),
        year: Joi.number().required(),
        genre: Joi.string().required(),
        thumbnail: Joi.string().required(),
        attachment: Joi.string().required(),
      });

      const newMusic = {
        ...body,
        thumbnail: files.thumbnail ? files.thumbnail[0].filename : null,
        attachment: files.attachment ? files.attachment[0].filename : null,
      };

      const { error } = schema.validate(newMusic, { abortEarly: false });

      if (error) {
        return callBack(error);
      }

      const music = await song.create(newMusic);
      if (!music) {
        return callBack("Please Try Again");
      }
      callBack(null, music);
    } catch (error) {
      callBack(error);
    }
  },
  editMusicService: async (data, callBack) => {
    const { body, files } = data;
    const { id } = data.params;
    try {
      const selectedMusic = await song.findOne({ where: { id } });
      const schema = Joi.object({
        title: Joi.string(),
        artistId: Joi.number(),
        year: Joi.number(),
        thumbnail: Joi.string(),
        attachment: Joi.string(),
      });

      const musicData = {
        ...body,
        thumbnail: files.thumbnail
          ? files.thumbnail[0].filename
          : selectedMusic.thumbnail,
        attachment: files.attachment
          ? files.attachment[0].filename
          : selectedMusic.attachment,
      };

      const { error } = schema.validate(musicData, { abortEarly: false });

      if (error) {
        return callBack(error);
      } else {
        const music = await song.update(musicData, {
          where: {
            id,
          },
        });
        if (!music) {
          return callBack("Please Try Again");
        }
        callBack(null, music);
      }
    } catch (error) {
      callBack(error);
    }
  },
  deleteMusicById: async (data, callBack) => {
    try {
      const musicDelete = await song.destroy({
        where: {
          id: data,
        },
      });
      await like.destroy({
        where: {
          songId: data,
        },
      });
      await playlistsong.destroy({
        where: {
          songId: data,
        },
      });
      if (!musicDelete) {
        return callBack(null, "Can't Delete This Song");
      }
      return callBack("Music Deleted");
    } catch (error) {
      callBack(error);
    }
  },
};
