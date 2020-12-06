"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Musics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Musics.belongsTo(models.Artists, {
        foreignKey: "artistId",
        as: "artist",
      });
    }
  }
  Musics.init(
    {
      title: DataTypes.STRING,
      year: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      attachment: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Musics",
    }
  );
  return Musics;
};
