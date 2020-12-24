"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      artist.hasMany(models.song, {
        as: "songs",
        foreignKey: "atristId",
      });
    }
  }
  artist.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      startCareer: DataTypes.INTEGER,
      old: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "artist",
    }
  );
  return artist;
};
