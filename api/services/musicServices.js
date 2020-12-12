const { Musics, Artists } = require("../../models");
const Joi = require("joi");

module.exports = {
  getAllMusics: async (callBack) => {
    try {
      const allMusics = await Musics.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "artistId", "deletedAt"],
        },
        include: {
          model: Artists,
          as: "artist",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      });
      if (!allMusics.length) {
        callBack("Musics Empty");
      } else {
        callBack(null, allMusics);
      }
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  },
  getMusicById: async (data, callBack) => {
    try {
      const music = await Musics.findOne({
        where: {
          id: data,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "artistId"],
        },
        include: [
          {
            model: Artists,
            as: "artist",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });
      if (!music) {
        callBack(`Music with id ${data} is not found`);
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
        thumbnail: Joi.string().required(),
        attachment: Joi.string().required(),
      });

      const newMusic = {
        ...body,
        artistId: body.artistId !== "0" ? body.artistId : null,
        thumbnail: files.thumbnail ? files.thumbnail[0].filename : null,
        attachment: files.attachment ? files.attachment[0].filename : null,
      };

      const { error } = schema.validate(newMusic, { abortEarly: false });

      if (error) {
        callBack(error);
      } else {
        const music = await Musics.create(newMusic);
        if (!music) {
          callBack("Please Try Again");
        } else {
          const results = await Musics.findOne({
            where: {
              id: music.id,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "artistId"],
            },
            include: [
              {
                model: Artists,
                as: "artist",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
            ],
          });
          if (!results) {
            callBack("Music Not Found");
          } else {
            callBack(null, results);
          }
        }
      }
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  },
  editMusicService: async (data, callBack) => {
    const { body, files } = data;
    const id = data.params.id;
    try {
      const selectedMusic = await Musics.findOne({ where: { id } });
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
        callBack(error);
      } else {
        const music = await Musics.update(musicData, {
          where: {
            id,
          },
        });
        if (!music) {
          callBack("Please Try Again");
        } else {
          const results = await Musics.findOne({
            where: {
              id,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "artistId"],
            },
            include: [
              {
                model: Artists,
                as: "artist",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
            ],
          });
          if (!results) {
            callBack("Music Not Found");
          } else {
            callBack(null, results);
          }
        }
      }
    } catch (error) {
      callBack(error);
    }
  },
  deleteMusicById: async (data, callBack) => {
    try {
      const musicDelete = await Musics.destroy({
        where: {
          id: data,
        },
      });
      if (musicDelete) {
        callBack(null, "success");
      } else {
        console.log(musicDelete);
        callBack("Music Not Found");
      }
    } catch (error) {
      callBack(error);
    }
  },
};
