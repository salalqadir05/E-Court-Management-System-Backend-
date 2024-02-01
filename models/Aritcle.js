const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
      lawyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lawyer",
      },
      title : {
        type : String,
        required : true 
      },
      description : {
        type : String,
        required  : true
      }
})
module.exports = mongoose.model("Article", ArticleSchema);
