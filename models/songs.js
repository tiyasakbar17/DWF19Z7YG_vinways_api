"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Songs.belongsTo(models.Artists, {
        as: "artist",
      });
    }
  }
  Songs.init(
    {
      title: DataTypes.STRING,
      year: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      attachment: DataTypes.STRING,
      artist_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Songs",
      deletedAt: "deleteAt",
    }
  );
  return Songs;
};
