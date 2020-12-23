"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      album.belongsTo(models.artist, {
        as: "artist",
        foreignKey: "artistId",
      });
      album.hasMany(models.song, {
        as: "songs",
        foreignKey: "songId",
      });
    }
  }
  album.init(
    {
      name: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      atristId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "album",
    }
  );
  return album;
};
