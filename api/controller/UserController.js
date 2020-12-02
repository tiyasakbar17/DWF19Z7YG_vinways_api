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
      eventResponse(error, results, res);
      // if (error) {
      //   console.log(error);
      //   return res.status(404).json({
      //     status: error,
      //     data: [],
      //   });
      // } else {
      //   return res.status(200).json({
      //     status: "success",
      //     data: {
      //       users: results,
      //     },
      //   });
      // }
    });
  },
  getUser: (req, res) => {
    const data = req.params.id;
    getUserById(data, (error, results) => {
      eventResponse(error, results[0], res);
      // if (error) {
      //   console.log(error);
      //   res.status(404).json({
      //     status: error,
      //     data: {},
      //   });
      // } else {
      //   res.status(200).json({
      //     status: "success",
      //     data: results[0],
      //   });
      // }
    });
  },
  deleteUser: (req, res) => {
    const data = req.params.id;
    deleteUserById(data, (error, results) => {
      eventResponse(error, data, res);
      // if (error) {
      //   res.status(404).json({
      //     status: error,
      //     data: [],
      //   });
      // } else {
      //   res.status(200).json({
      //     status: "success",
      //     data: {
      //       id: data,
      //     },
      //   });
      // }
    });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateUser(id, data, (error, results) => {
      eventResponse(error, results[0], res);
      // if (error) {
      //   res.status(404).json({
      //     status: error,
      //     data: [],
      //   });
      // } else {
      //   res.status(200).json({
      //     status: "success",
      //     data: results[0],
      //   });
      // }
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
      // if (error) {
      //   res.status(409).json({
      //     status: error,
      //     data: [],
      //   });
      // } else {
      //   res.status(201).json({
      //     status: "success",
      //     data: results,
      //   });
      // }
    });
  },
};
