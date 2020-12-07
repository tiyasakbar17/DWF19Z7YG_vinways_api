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
        successResponse(res, results);
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
        successResponse(res, results);
      }
    });
  },
};