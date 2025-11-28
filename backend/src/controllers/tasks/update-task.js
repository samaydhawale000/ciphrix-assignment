const Tasks = require("../../models/task-model");

const updateTask = async (request, response) => {
  try {
    //------------- extract data from request body --------
    const { id, title, description, status } = request.body;

    if(!id){
      return response.status(400).json({
        status: "FAILED",
        message: "id is Required",
      });
    }

    const isExist = await Tasks.findOne({ _id: id });

    if (!isExist) {
      return response.status(400).json({
        status: "FAILED",
        message: "Task is not available to update",
      });
    }

    const dataToInsert = {
      title : title || isExist?.title,
      description : description || isExist?.description,
      status : status || isExist?.status,
    };

    // ----- Add user -----
    const result = await Tasks.updateOne({ _id: id }, dataToInsert);

    if (result?.acknowledged) {
      return response.status(200).json({
        status: "SUCCESS",
        message: "Task updated successfully.",
      });
    } else {
      return response.status(400).json({
        status: "FAILED",
        message: "Failed to update task, Please try again!",
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = updateTask;
