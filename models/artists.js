"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artists.hasMany(models.Musics, { foreignKey: "artistId", as: "musics" });
    }
  }
  Artists.init(
    {
      name: DataTypes.STRING,
      old: DataTypes.INTEGER,
      category: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      startCareer: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Artists",
    }
  );
  return Artists;
};
