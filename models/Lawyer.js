const mongoose = require("mongoose");
const LawyerSchema = new mongoose.Schema({
    lawyer:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Lawyer'
    },
name: {
type :String,
required : true
},

Cnic: {
    type :String,
    required : true
},
Email:{
    type:String,
    required:true,
    max : 50
},
Lawyer_License_No:{
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

module.exports = mongoose.model("Lawyer",LawyerSchema);