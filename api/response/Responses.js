module.exports = {
  eventResponse: (error, results, key, res) => {
    if (error) {
      console.log(error);
      return res.status(404).json({
        status: error,
        data: [],
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          [key]: results,
        },
      });
    }
  },
  createResponse: (error, results, key, res) => {
    if (error) {
      console.log(error);
      return res.status(409).json({
        status: error,
        data: [],
      });
    } else {
      return res.status(201).json({
        status: "success",
        data: {
          [key]: results,
        },
      });
    }
  },
  uploadFailedResponse: (res, message) => {
    return res.status(400).json({
      status: "Failed",
      message: message,
    });
  },
  successResponse: (res, results, message, key, status) => {
    return res.status(status || 200).json({
      status: "success",
      message,
      data: {
        [key]: results,
      },
    });
  },
  failedResponse: (res, message, status) => {
    return res.status(status || 400).json({
      status: "failed",
      message,
    });
  },
  failedWithDetails: (res, message, details, status) => {
    return res.status(status || 400).json({
      status: "failed",
      message,
      details,
    });
  },
};
