const { eventResponse, createResponse } = require("../response/Responses");
const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  addUser,
} = require("../services/UsersServices");

module.exports = {
  getUsers: (req, res) => {
    const data = req.body;
    getAllUsers(data, (error, results) => {
      eventResponse(error, results, "users", res);
    });
  },
  getUser: (req, res) => {
    const data = req.params.id;
    getUserById(data, (error, results) => {
      eventResponse(error, results[0], "user", res);
    });
  },
  deleteUser: (req, res) => {
    const data = req.params.id;
    deleteUserById(data, (error, results) => {
      eventResponse(error, data, "id", res);
    });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateUser(id, data, (error, results) => {
      eventResponse(error, results[0], "user", res);
    });
  },
  addUser: (req, res) => {
    const data = req.body;
    addUser(data, (error, results) => {
      const {
        id,
        fullName,
        email,
        password,
        thumbnail,
        activeDays,
        role,
      } = results;
      const resultToShow = {
        id,
        fullName,
        email,
        password,
        thumbnail,
        status: activeDays > 0 ? "active" : "not active",
        role,
      };
      createResponse(error, resultToShow, "user", res);
    });
  },
};
