const { getAllUsers, getUserById } = require("../services/UsersServices");

module.exports = {
  getUsers: (req, res) => {
    const data = req.body;
    getAllUsers(data, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
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
        res.status(400).json({
          status: error,
          data: {},
        });
      } else {
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    });
  },
};
