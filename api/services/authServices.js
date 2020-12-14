const { Users, Transactions } = require("../../models");
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
        console.log(error);
        return callBack(error);
      } else {
        const checkEmail = await Users.findOne({
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
          const user = await Users.create(newUser);

          const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };
          jwt.sign(
            tokenPayload,
            process.env.SECRET_KEY,
            {
              expiresIn: 86400,
            },
            (error, token) => {
              if (error) {
                console.log(error);
                return callBack(error);
              } else {
                return callBack(null, token);
              }
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
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
        console.log(error);
        return callBack(error);
      }

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      const validatingPassword = await bcrypt.compare(password, user.password);

      if (!user || !validatingPassword) {
        return callBack("Check Your Email Or Password");
      } else {
        const userId = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        jwt.sign(userId, process.env.SECRET_KEY, (error, token) => {
          if (error) {
            console.log(error);
            return callBack(error);
          } else {
            const resultToSend = {
              email,
              token,
            };
            return callBack(null, resultToSend);
          }
        });
      }
    } catch (error) {
      console.log(error);
      return callBack("Check Your Email Or Password");
    }
  },
  findUserDataById: async (data, callBack) => {
    try {
      const dataUser = await Users.findOne({
        where: { id: data },
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
        },
        include: [
          {
            model: Transactions,
            as: "transactions",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
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
    const newData = {
      thumbnail: data.files.thumbnail[0].filename,
    };
    try {
      const result = await Users.update(newData, {
        where: { id: data.user.id },
      });
      callBack(null, result);
    } catch (error) {
      console.log(error);
      callBack(error);
    }
  },
};
