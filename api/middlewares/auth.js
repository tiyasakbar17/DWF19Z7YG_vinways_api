const jwt = require("jsonwebtoken");
const { uploadFailedResponse } = require("../response/Responses");
const code = process.env.SECRET_KEY;
const { Users } = require("../../models");

module.exports = {
  jwtRoleAuth: (roleAkses) => {
    return async (req, res, next) => {
      //check token
      const tokenWithBearer = req.headers.authorization;

      if (tokenWithBearer) {
        let token = tokenWithBearer.split(" ")[1];
        jwt.verify(token, code, (error, result) => {
          if (error) {
            console.log(error);
            return uploadFailedResponse(res, error);
          } else {
            console.log(result);
            return uploadFailedResponse(res, error);
          }
        });
      }
    };
  },
};
