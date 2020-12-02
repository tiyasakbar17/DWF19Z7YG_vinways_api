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
      if (error) {
        console.log(error);
        return res.status(404).json({
          status: error,
          data: [],
        });
      } else {
        return res.status(200).json({
          status: "success",
          data: {
            users: results,
          },
        });
      }
    });
  },
  getUser: (req, res) => {
    const data = req.params.id;
    getUserById(data, (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).json({
          status: error,
          data: {},
        });
      } else {
        res.status(200).json({
          status: "success",
          data: results[0],
        });
      }
    });
  },
  deleteUser: (req, res) => {
    const data = req.params.id;
    deleteUserById(data, (error, results) => {
      if (error) {
        res.status(404).json({
          status: error,
          data: [],
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            id: data,
          },
        });
      }
    });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateUser(id, data, (error, results) => {
      if (error) {
        res.status(404).json({
          status: error,
          data: [],
        });
      } else {
        res.status(200).json({
          status: "success",
          data: results[0],
        });
      }
    });
  },
  addUser: (req, res) => {
    const data = req.body;
    addUser(data, (error, results) => {
      if (error) {
        res.status(409).json({
          status: error,
          data: [],
        });
      } else {
        res.status(201).json({
          status: "success",
          data: results,
        });
      }
    });
  },
};
