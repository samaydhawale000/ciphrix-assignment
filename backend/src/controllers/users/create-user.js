const bcrypt = require("bcryptjs");
const Users = require("../../models/user.model");

const createUser = async (request, response) => {
   try {
      //------------- extract data from request body --------
      const { name, userType, mobile, password, confirmPassword } = request.body;

      //  ------------ check validation -------------
     if(!name || !mobile || !password || !confirmPassword, !userType){
      return response.status(400).json({
            status: "FAILED",
            message: "All fields are mandatory, please fill and try again",
         });
     }

      // --------check for password & confirm password is equal--------
      if (password !== confirmPassword) {
         return response.status(400).json({
            status: "FAILED",
            message: "Password and confirm password must be the same",
         });
      }
      const isUserExist = await Users.findOne({mobile: mobile});

      if (isUserExist) {
         return response.status(400).json({
            status: "FAILED",
            message: "User already exist with this mobile number.",
         });
      }

      //------ hash password------
      const hashPassword = await bcrypt.hashSync(password, 14);

      const dataToInsert = {
         name,
         mobile,
         userType,
         password: hashPassword,
      };

      // ----- Add user -----
      const result = await Users.create(dataToInsert);

      if (result?._id) {
         return response.status(200).json({
            status: "SUCCESS",
            message: "User registered successfully.",
         });
      } else {
         return response.status(400).json({
            status: "FAILED",
            message: "Failed to register user, Please try again!",
         });
      }
   } catch (error) {
      return response.status(500).json({
         status: "FAILED",
         message: error.message,
      });
   }
};

module.exports = createUser;
