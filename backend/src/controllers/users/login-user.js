const bcrypt = require("bcryptjs");
const generateUserJWT = require('../../generate.token');
const Users = require("../../models/user.model");

const loginUser = async (request, response) => {
  try {
    
    const { mobile, password } = request.body;

    // ---------validation -----
    if (( !mobile || !password )) {
      return response.status(400).json({
        status: "FAILED",
        message:
          "Missing fields! All fields are mandatory, please fill and try again",
      });
    }

    // ----------- exist or not ------------
    const isUserExist = await Users.findOne({mobile});
    if (!isUserExist) {
      return response.status(400).json({
        status: "FAILED",
        message: "Invalid user, check your user credentials & try again!",
      });
    }

    //compare password with password in database
    const comparePasswords = await bcrypt.compareSync(
      password,
      isUserExist.password
    );
    if (comparePasswords) {
      
      const userDetails = {
        _id: isUserExist._id,
        name: isUserExist.name,
        mobile: isUserExist?.mobile,
        userType: isUserExist?.userType,
      };
      const token = generateUserJWT(userDetails);
      if (token) {
        return response.status(200).json({
          status: "SUCCESS",
          message: "Login Successfully",
          token,
          userDetails,
        });
      }
    } else {
      return response.status(400).json({
        status: "FAILED",
        message: "Incorrect credential!, check your mobile or password.",
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = loginUser;
