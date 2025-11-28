const Tasks = require("../../models/task-model");

const getTaskById = async (request, response) => {
  try {
    const { id } = request.query;

    if (!id) {
      return response.status(400).json({
        status: "FAILED",
        message: "id is Required",
      });
    }
    const result = await Tasks.findOne({ _id: id });

    if (result) {
      return response.status(200).json({
        status: "SUCCESS",
        message: "list fetched successfully",
        result,
      });
    } else {
      return response.status(200).json({
        status: "FAILED",
        message: "Task Data not available.",
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "FAILED",
      message: error?.message,
    });
  }
};

module.exports = getTaskById;
