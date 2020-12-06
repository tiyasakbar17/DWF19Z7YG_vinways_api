"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Users, {
        as: "user",
      });
    }
  }
  Transactions.init(
    {
      userId: DataTypes.INTEGER,
      bankAccountNumber: DataTypes.INTEGER,
      proofOfTransfer: DataTypes.STRING,
      remainingActive: DataTypes.INTEGER,
      paymentStatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
