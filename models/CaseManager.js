const mongoose = require("mongoose");
const CaseManagerSchema = new mongoose.Schema({
name: {
type :String,
required : true
},

Title: {
    type: String,
    required: false,
  },
Email:{
    type:String,
    required:true,
    unique: true,
    max : 50
},
Designation :{
type : String,
required : true
},
Password :{
    type : String,
    required : true,
    min : 8
}
});

module.exports = mongoose.model("CaseManager",CaseManagerSchema);