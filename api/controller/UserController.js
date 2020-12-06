const { failedResponse, successResponse } = require("../response/Responses");
const { getAllUsers, deleteUserById } = require("../services/usersServices");

module.exports = {
  getUsers: (req, res) => {
    const data = req.body;
    getAllUsers(data, (error, results) => {
      if (error) {
        return failedResponse(res, error);
      } else {
        return successResponse(res, results, "List Users", "Users");
      }
    });
  },
  deleteUser: (req, res) => {
    const data = req.params.id;
    deleteUserById(data, (error, results) => {
      if (error) {
        return failedResponse(res, error);
      } else {
        return successResponse(res, data, "User Deleted", "id");
      }
    });
  },
};
