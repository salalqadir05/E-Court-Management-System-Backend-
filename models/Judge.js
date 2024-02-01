const mongoose = require("mongoose");
const JudgeSchema = new mongoose.Schema({
name: {
type :String,
required : true
},

Domain: {
    type :String,
    required : true
},
Email:{
    type:String,
    required:true,
    unique: true,
    max : 50
},
Password :{
    type : String,
    required : true,
    min : 8
}
});

module.exports = mongoose.model("Judge",JudgeSchema);