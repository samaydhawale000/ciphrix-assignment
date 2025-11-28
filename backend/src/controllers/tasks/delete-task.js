const Tasks = require("../../models/task-model");

const deleteTask = async (request, response) => {
  try {
    const { id } = request.query;

    if (!id) {
      return response.status(400).json({
        status: "FAILED",
        message: "id is Required",
      });
    }

    const isExist = await Tasks.findOne({ _id: id });

    if (!isExist) {
      return response.status(400).json({
        status: "FAILED",
        message: "Task is not available to Delete",
      });
    }
    const result = await Tasks.deleteOne({ _id: id });

    if (result?.acknowledged) {
      return response.status(200).json({
        status: "SUCCESS",
        message: "Deleted successfully",
      });
    } else {
      return response.status(200).json({
        status: "FAILED",
        message: "Failed to delete",
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "FAILED",
      message: error?.message,
    });
  }
};

module.exports = deleteTask;
