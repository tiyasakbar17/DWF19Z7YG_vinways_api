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
  getUserById: async (data, callBack) => {
    try {
      const user = await Users.findAll({
        where: {
          id: data,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
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
  updateUser: async (id, data, callBack) => {
    try {
      const userToUpdate = await Users.update(data, {
        where: {
          id: id,
        },
      });
      if (userToUpdate) {
        const userNew = await Users.findAll({
          where: {
            id: id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        if (userNew === 0) {
          callBack("User Not Found");
        } else {
          callBack(null, userNew);
        }
      } else {
        callBack("User Not Found");
      }
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  },
  addUser: async (data, callBack) => {
    try {
      const newUser = await Users.create(data);
      if (newUser) {
        callBack(null, newUser);
      } else {
        callBack("Can't Add New User");
      }
    } catch {
      callBack("Can't Add New User");
    }
  },
};
