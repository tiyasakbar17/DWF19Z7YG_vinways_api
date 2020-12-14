const {
  failedResponse,
  successResponse,
  failedWithDetails,
} = require("../response/Responses");
const {
  getAllTransactions,
  getTransactionById,
  addTransaction,
  editTransaction,
  deleteTransaction,
  getUserTransactions,
} = require("../services/transactionServices");

module.exports = {
  getTransactions: (req, res) => {
    getAllTransactions(req.body, (error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, results, "Transactions Loaded", "transactions");
      }
    });
  },
  getTransaction: (req, res) => {
    const data = req.params.id;
    getTransactionById(data, (error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, results, "Transaction Loaded", "transaction");
      }
    });
  },
  addTransaction: (req, res) => {
    addTransaction(req, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          failedResponse(res, error);
        }
      } else {
        successResponse(
          res,
          results,
          "Transaction is Added",
          "transaction",
          201
        );
      }
    });
  },
  editTransaction: (req, res) => {
    editTransaction(req, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          failedResponse(res, error);
        }
      } else {
        successResponse(res, results, "Transaction is Edited", "transaction");
      }
    });
  },
  deleteTransaction: (req, res) => {
    deleteTransaction(req.params.id, (error, results) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, req.params.id, "Transaction is Deleted", "id");
      }
    });
  },
  getUserTransactions: (req, res) => {
    const { id } = req.user;
    getUserTransactions(id, (error, results) => {
      if (error) {
        successResponse(res, [], "Transaction Loaded", "transactions");
      } else {
        successResponse(res, results, "Transactions Loaded", "transactions");
      }
    });
  },
};
