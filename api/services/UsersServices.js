const { Users } = require("../../models");

module.exports = {
  getAllUsers: async (data, callBack) => {
    try {
      const allUsers = await Users.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (allUsers === 0) {
        callBack("Post Empty");
      } else {
        callBack(null, allUsers);
      }
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  },
  deleteUserById: async (data, callBack) => {
    try {
      const userDelete = await Users.destroy({
        where: {
          id: data,
        },
      });
      if (userDelete) {
        callBack(null, "success");
      } else {
        console.log(userDelete);
        callBack("User Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
