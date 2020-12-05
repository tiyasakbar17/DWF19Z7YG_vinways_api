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
      Artists.hasMany(models.Songs, {
        as: "song",
      });
    }
  }
  Artists.init(
    {
      name: DataTypes.STRING,
      old: DataTypes.NUMBER,
      category: DataTypes.STRING,
      startCareer: DataTypes.DATE,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Artists",
      deletedAt: "deleteAt",
    }
  );
  return Artists;
};
