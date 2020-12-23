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
      artist.hasMany(models.album, {
        as: "albums",
        foreignKey: "atristId",
      });
    }
  }
  artist.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      startCareer: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "artist",
    }
  );
  return artist;
};
