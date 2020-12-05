module.exports = {
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
      data: [],
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
