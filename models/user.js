"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.transaction, {
        as: "transactions",
        foreignKey: "userId",
      });
      user.hasMany(models.playlist, {
        as: "playlists",
        foreignKey: "userId",
      });
      user.hasMany(models.like, {
        as: "liked",
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role: DataTypes.INTEGER,
      password: DataTypes.STRING,
      activeUntil: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
