const jwt = require("jsonwebtoken");
const { failedResponse } = require("../response/Responses");
const code = process.env.SECRET_KEY;

module.exports = {
  jwtRoleAuth: (roleAkses) => {
    return async (req, res, next) => {
      try {
        const headAuth = req.headers.authorization;
        if (headAuth) {
          const tokenWithBearer = headAuth.replace("Bearer ", "");
          jwt.verify(tokenWithBearer, code, (error, result) => {
            if (error) {
              failedResponse(res, "Token Tidak Terdaftar");
            } else {
              if (roleAkses === result.role || result.role === 1) {
                req.user = result;
                next();
              } else {
                failedResponse(res, "You can't Access this endpoint");
              }
            }
          });
        } else {
          failedResponse(res, "No Token Inserted");
        }
      } catch (error) {
        failedResponse(res, "Server Error");
      }
    };
  },
};
