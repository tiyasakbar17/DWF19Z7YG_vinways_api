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
      const headAuth = req.headers.authorization;
      if (headAuth) {
        const tokenWithBearer = headAuth.replace("Bearer ", "");
        jwt.verify(tokenWithBearer, code, (error, result) => {
          if (error) {
            console.log(error);
            uploadFailedResponse(res, "Token Tidak Terdaftar");
          } else {
            if (roleAkses === result.role || result.role === 1) {
              req.user = result;
              next();
            } else {
              uploadFailedResponse(res, "You can't Access this endpoint");
            }
          }
        });
      } else {
        uploadFailedResponse(res, "No Token Inserted");
      }
    };
  },
  findAccount: async (req, res, next) => {
    try {
      const headAuth = req.headers.authorization;
      if (!headAuth) {
        failedResponse(res, "Token is not Detected");
      } else {
        const tokenWithBearer = headAuth.replace("Bearer ", "");
        const dataUser = await jwt.verify(tokenWithBearer, code);
        req.user = dataUser;
        next();
      }
    } catch (error) {
      console.log(error);
      failedResponse(res, error);
    }
  },
};
