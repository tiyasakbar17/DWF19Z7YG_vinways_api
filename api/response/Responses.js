module.exports = {
  eventResponse: (error, results, res) => {
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
          users: results,
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
};
