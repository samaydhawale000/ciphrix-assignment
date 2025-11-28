const Tasks = require("../../models/task-model");

const createTask = async (request, response) => {
   try {
      //------------- extract data from request body --------
      const { title, description, status} = request.body;

      //  ------------ check validation -------------
     if(!title || !description || !status){
      return response.status(400).json({
            status: "FAILED",
            message: "All fields are mandatory, please fill and try again",
         });
     }

      const dataToInsert = {
         title,
         description,
         status,
      };

      // ----- Add user -----
      const result = await Tasks.create(dataToInsert);

      if (result?._id) {
         return response.status(200).json({
            status: "SUCCESS",
            message: "Task created successfully.",
         });
      } else {
         return response.status(400).json({
            status: "FAILED",
            message: "Failed to create task, Please try again!",
         });
      }
   } catch (error) {
      return response.status(500).json({
         status: "FAILED",
         message: error.message,
      });
   }
};

module.exports = createTask;
