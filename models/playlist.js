"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlist.belongsTo(models.user, {
        as: "user",
        foreignKey: "userId",
      });
      playlist.hasMany(models.song, {
        through: models.playlistsong,
        as: "songs",
        foreignKey: "songId",
      });
    }
  }
  playlist.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "playlist",
    }
  );
  return playlist;
};
