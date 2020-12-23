const {
  failedResponse,
  successResponse,
  failedWithDetails,
} = require("../response/Responses");
const {
  loginService,
  registerServices,
  findUserDataById,
  changeUserPict,
  handlerLike,
} = require("../services/authServices");

module.exports = {
  loginController: (req, res) => {
    const data = req.body;
    loginService(data, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          return failedResponse(res, error);
        }
      } else {
        successResponse(res, results, "Login Success", "chanel");
      }
    });
  },
  registerController: (req, res) => {
    const data = req.body;
    registerServices(data, (error, results) => {
      if (error) {
        if (error.details) {
          const details = error.details.map((detail) => detail.message);
          failedWithDetails(res, error.details[0].message, details);
        } else {
          return failedResponse(res, error);
        }
      } else {
        const showResult = {
          email: data.email,
          token: results,
        };
        return successResponse(
          res,
          showResult,
          "Account Registered",
          "user",
          201
        );
      }
    });
  },
  findUserByToken: (req, res) => {
    const { id } = req.user;
    findUserDataById(id, (error, result) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, result, "Data Loaded", "user");
      }
    });
  },
  changePict: (req, res) => {
    changeUserPict(req, (error, result) => {
      if (error) {
        failedResponse(res, error);
      } else {
        successResponse(res, "Success", "Profle Picture Updated", "status");
      }
    });
  },
  likeHandler: (rea, res) => {
    handlerLike(req, (error, results) => {
      if (error) {
        return failedResponse(res, error);
      }
      successResponse(res, results, results, "status");
    });
  },
};
