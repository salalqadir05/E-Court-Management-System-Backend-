const mongoose = require("mongoose");
const applicantSchema = new mongoose.Schema({
Firstname: {
type :String,
required : true
},

Lastname: {
    type :String,
    required : true
    },
Email:{
    type:String,
    required:true,
    max : 50
},
Cnic:{
    type : String,
    required : true,
    unique: true,
},
Password :{
    type : String,
    required : true,
    min : 8
}
});
module.exports = mongoose.model("Applicant",applicantSchema);