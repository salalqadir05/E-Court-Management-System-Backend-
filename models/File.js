const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant",
      },
      lawyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lawyer",
      },
      casemanager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CaseManager",
      },
      filename : {
        type : String
      },
      path : {
        type : String 
      }
})
module.exports = mongoose.model("File", FileSchema);
