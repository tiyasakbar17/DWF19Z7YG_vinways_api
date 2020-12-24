const { user, transaction, like } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

module.exports = {
  registerServices: async (data, callBack) => {
    const { email, password } = data;
    try {
      const schema = Joi.object({
        fullName: Joi.string().min(2).required(),
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(6).required(),
      });

      const { error } = schema.validate({ ...data }, { abortEarly: false });

      if (error) {
        return callBack(error);
      } else {
        const checkEmail = await user.findOne({
          where: {
            email,
          },
        });

        if (checkEmail) {
          callBack("Use Another Email");
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = {
            ...data,
            password: hashedPassword,
            role: 2,
          };
          const newUser = await user.create(newUser);

          const tokenPayload = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
          };
          jwt.sign(
            tokenPayload,
            process.env.SECRET_KEY,
            {
              expiresIn: 86400,
            },
            (error, token) => {
              if (error) {
                return callBack(error);
              } else {
                return callBack(null, token);
              }
            }
          );
        }
      }
    } catch (error) {
      return callBack(error);
    }
  },
  loginService: async (data, callBack) => {
    const { email, password } = data;
    try {
      const schema = Joi.object({
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(6).required(),
      });

      const { error } = schema.validate({ ...data }, { abortEarly: false });

      if (error) {
        return callBack(error);
      }
      console.log("ERROR", email);
      const calledUser = await user.findOne({
        where: {
          email,
        },
      });
      const validatingPassword = await bcrypt.compare(
        password,
        calledUser.password
      );

      if (!calledUser || !validatingPassword) {
        return callBack("Check Your Email Or Password");
      } else {
        const userId = {
          id: calledUser.id,
          email: calledUser.email,
          role: calledUser.role,
        };
        jwt.sign(
          userId,
          process.env.SECRET_KEY,
          {
            expiresIn: 86400,
          },
          (error, token) => {
            if (error) {
              return callBack(error);
            } else {
              const resultToSend = {
                email,
                token,
              };
              return callBack(null, resultToSend);
            }
          }
        );
      }
    } catch (error) {
      return callBack("Check Your Email Or Password");
    }
  },
  findUserDataById: async (data, callBack) => {
    try {
      const dataUser = await user.findOne({
        where: { id: data },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
        include: [
          {
            model: transaction,
            as: "transactions",
            attributes: {
              exclude: ["updatedAt"],
            },
          },
          {
            model: like,
            as: "liked",
            attributes: {
              exclude: ["updatedAt"],
            },
          },
        ],
      });
      if (!dataUser) {
        callBack("User Not Found");
      } else {
        callBack(null, dataUser);
      }
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  },
  changeUserPict: async (data, callBack) => {
    const { id } = data.user;
    const newData = {
      thumbnail: data.files.thumbnail[0].filename,
    };
    try {
      const result = await user.update(newData, {
        where: {
          id,
        },
      });
      callBack(null, result);
    } catch (error) {
      callBack(error);
    }
  },
  handlerLike: async (data, callBack) => {
    try {
      const userId = data.user.id;
      const { songId } = data.params;
      const checkAvail = await like.findOne({
        where: {
          userId,
          songId,
        },
      });
      if (!checkAvail) {
        const result = await like.create({ userId, songId });
        if (!result) {
          return callBack("Server Error");
        }
        return callBack(null, "Liked");
      }
      const deletes = await like.destroy({
        where: {
          userId,
          songId,
        },
      });
      if (!deletes) {
        return callBack("Server Error");
      }
      callBack(null, "Unliked");
    } catch (error) {
      callBack(error);
    }
  },
};
