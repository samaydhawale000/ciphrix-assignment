const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      userType: {
         type: String,
         required: true,
         enum: ['admin', 'normal'],
         trim: true
      },
      name: {
         type: String,
         required: true,
         trim: true,
      },
      mobile: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
      strict: false,
   }
);


const Users = mongoose.model("Users", userSchema);
module.exports = Users;
