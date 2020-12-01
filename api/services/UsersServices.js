const { Users } = require("../../models");

module.exports = {
  getAllUsers: async (data, callBack) => {
    try {
      const allUsers = await Users.findAll();
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
  getUserById: async (data, callBack) => {
    try {
      const user = await Users.findAll({
        where: {
          id: data,
        },
      });
      if (user === 0) {
        callBack("No User Found");
      } else {
        callBack(null, user);
      }
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  },
};
