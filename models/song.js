"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      song.belongsTo(models.album, {
        as: "album",
        foreignKey: "albumId",
      });
      song.hasMany(models.user, {
        through: models.like,
      });
      song.hasMany(models.playlistsong, {
        as: "playlists",
        foreignKey: "songId",
      });
    }
  }
  song.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      attachment: DataTypes.STRING,
      genre: DataTypes.STRING,
      albumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "song",
    }
  );
  return song;
};
