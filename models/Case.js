const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CaseSchema = new mongoose.Schema({
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "Applicant",
  },
  lawyer: {
    type: Schema.Types.ObjectId,
    ref: "Lawyer",
  },
  Case_Details: {
    type: String,
    required: true,
  },
  Case_Type: {
    type: String,
    required: false,
    default: null,
  },
  Case_Files: {
    type: String,
    required: false,
    default: null,
  },
  Lawyer_Lisence_Number: {
    type: String,
    required: false,
    default: null,
  },
  Lawyer_Name: {
    type: String,
    required: false,
    default: null,
  },
  CaseNumber: {
    type: String,
    unique: true,
    default: null,
  },
  Case_Hearing_Date: {
    type: Date,
    required: false,
    default: null,
  },
  Case_Status: {
    type: String,
    required: false,
    default: "Status Pending",
  },
  Comments_Reader :{
    type : String,
    required : false,
    default : "It will be Updated Soon"
  },
  judgenames :{
    type :String,
    required : false,
    default : "Judge is not assigned yet"
  },
  Court_details : {
    type : String,
    required : false,
    default : "Court Details are not updated yet"
  },
  checkpriority :{
    type : String,
    required : true,
    default : "off"


  }
});

module.exports = mongoose.model("Case", CaseSchema);
