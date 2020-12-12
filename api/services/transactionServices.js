const { Transactions, Users } = require("../../models");
const Joi = require("joi");

module.exports = {
  getAllTransactions: async (data, callBack) => {
    try {
      const allTransactions = await Transactions.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["fullName", "activeDay"],
          },
        ],
      });
      if (!allTransactions) {
        callBack("No User Found");
      } else {
        callBack(null, allTransactions);
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  getTransactionById: async (data, callBack) => {
    try {
      const getTransaction = await Transactions.findOne({
        where: {
          id: data,
        },
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["fullName", "activeDay"],
          },
        ],
      });
      if (!getTransaction) {
        callBack("Can't Get Any Data, Transaction is Not Found");
      } else {
        callBack(null, getTransaction);
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  addTransaction: async (data, callBack) => {
    const { body, files, user } = data;
    console.log(user);
    try {
      const schema = Joi.object({
        userId: Joi.number().required(),
        bankAccountNumber: Joi.number().required(),
        proofOfTransfer: Joi.string().required(),
      });

      const insertedData = {
        ...body,
        userId: user.id,
        proofOfTransfer: files.thumbnail ? files.thumbnail[0].filename : null,
      };

      const { error } = schema.validate(insertedData, { abortEarly: false });

      if (error) {
        callBack(error);
      } else {
        const newTransaction = await Transactions.create(insertedData);
        if (!newTransaction) {
          callBack("Please Try Again");
        } else {
          const resultToShow = await Transactions.findOne({
            where: { id: newTransaction.id },
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
            include: [
              {
                model: Users,
                as: "user",
                attributes: ["fullName", "activeDay"],
              },
            ],
          });
          callBack(null, resultToShow);
        }
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  editTransaction: async (data, callBack) => {
    const {
      params: { id },
      body,
      files,
    } = data;
    try {
      const calledTransaction = await Transactions.findOne({
        where: { id },
        include: [{ model: Users, as: "user" }],
      });
      if (!calledTransaction) {
        callBack("Transaction is not found");
      } else {
        const schema = Joi.object({
          userId: Joi.number(),
          bankAccountNumber: Joi.number(),
          proofOfTransfer: Joi.string(),
          paymentStatus: Joi.boolean(),
        });

        const insertedData = {
          ...body,
          proofOfTransfer: files.thumbnail
            ? files.thumbnail[0].filename
            : calledTransaction.proofOfTransfer,
        };

        const { error } = schema.validate(insertedData, { abortEarly: false });

        if (error) {
          callBack(error);
        } else {
          const oldDate = await new Date(
            calledTransaction.user.activeDay
          ).getTime();
          const today = Date.now();
          const increment = 30 * 24 * 60 * 60 * 1000;
          if (calledTransaction.paymentStatus === null) {
            if (body.paymentStatus === "true") {
              if (oldDate < today) {
                const newActiveDay = {
                  activeDay: new Date(today + increment),
                };
                const newUser = await Users.update(newActiveDay, {
                  where: { id: calledTransaction.userId },
                });
                console.log(newActiveDay);
              } else {
                const newActiveDay = {
                  activeDay: new Date(oldDate + increment),
                };
                const newUser = await Users.update(newActiveDay, {
                  where: { id: calledTransaction.userId },
                });
                console.log(newActiveDay);
              }
            }
          }
          if (calledTransaction.paymentStatus === true) {
            if (body.paymentStatus === "false") {
              const newActiveDay = {
                activeDay: new Date(oldDate - increment),
              };
              const newUser = await Users.update(newActiveDay, {
                where: { id: calledTransaction.userId },
              });
              console.log(newActiveDay);
            }
          }
          const editedTransaction = await Transactions.update(insertedData, {
            where: { id },
          });
          if (!editedTransaction) {
            callBack("Please Try Again");
          } else {
            const resultToShow = await Transactions.findOne({
              where: { id },
              attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
              include: [
                {
                  model: Users,
                  as: "user",
                  attributes: ["fullName", "activeDay"],
                },
              ],
            });
            callBack(null, resultToShow);
          }
        }
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
  deleteTransaction: async (data, callBack) => {
    try {
      const deletedTransaction = await Transactions.destroy({
        where: { id: data },
      });
      if (!deletedTransaction) {
        callBack("Data Not Found");
      } else {
        callBack(null, "success");
      }
    } catch (error) {
      callBack("Server Error");
    }
  },
};
