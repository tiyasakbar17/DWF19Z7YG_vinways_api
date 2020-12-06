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
            return uploadFailedResponse(res, "Token Tidak Terdaftar");
          } else {
            if (roleAkses === result.role) {
              next();
            } else {
              return uploadFailedResponse(
                res,
                "You can't Access this endpoint"
              );
            }
          }
        });
      } else {
        return uploadFailedResponse(res, "No Token Inserted");
      }
    };
  },
};
