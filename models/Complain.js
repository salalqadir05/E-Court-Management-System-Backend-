const mongoose = require("mongoose");
const ComplainSchema = new mongoose.Schema({
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant",
      },
      description : {
        type : String,
        required  : true
      },
      status : {
        type :String,
        required : false,
        default : "Pending"
      }
})
module.exports = mongoose.model("Complain", ComplainSchema);
