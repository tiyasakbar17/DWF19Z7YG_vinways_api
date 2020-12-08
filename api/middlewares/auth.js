const jwt = require("jsonwebtoken");
const {
  uploadFailedResponse,
  failedResponse,
} = require("../response/Responses");
const code = process.env.SECRET_KEY;

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
            if (roleAkses === result.role || result.role === 1) {
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
  findAccount: async (req, res, next) => {
    try {
      const tokenWithBearer = req.headers.authorization;
      if (!tokenWithBearer) {
        failedResponse(res, "Token is not Detected");
      } else {
        let token = tokenWithBearer.split(" ")[1];
        const dataUser = jwt.verify(token, code);
        req.user = dataUser;
        next();
      }
    } catch (error) {
      console.log(error);
      failedResponse(res, error);
    }
  },
};
