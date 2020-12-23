"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class playlistsong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlistsong.belongsTo(models.playlist, {
        as: "playlist",
        foreignKey: "playlistId",
      });
      playlistsong.belongsTo(models.song, {
        as: "song",
        foreignKey: "songId",
      });
    }
  }
  playlistsong.init(
    {
      playlistId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "playlistsong",
    }
  );
  return playlistsong;
};
