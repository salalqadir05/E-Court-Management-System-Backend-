const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const applicantRoutes = require('./routes/applicantRoutes');
const LawyerRoutes = require("./routes/lawyerRoutes");
const casemanagerRoutes = require("./routes/casemanagerRoutes"); 
const CaseRouter = require("./routes/Case");
const fileRoute = require("./routes/fileRoute")
// Example JSON parsing middleware
const bodyParser = require('body-parser');
const Aritcle = require("./routes/Article");
const Complain = require("./routes/Complain");
const Sendmail  = require("./routes/SendMail");




dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use("/api/auth", applicantRoutes);
app.use("/api/authlawyer", LawyerRoutes);
app.use("/api/authcasemanager", casemanagerRoutes);
app.use("/api/authcase", CaseRouter); // Correct route path
app.use("/api/casefiles", fileRoute); // Correct route path
app.use("/api/article",Aritcle)
app.use("/api/complain",Complain)
app.use("/api/mailauth",Sendmail)

try 
    {
  mongoose.connect(process.env.MONGO_URL)
  console.log("Database is connected with Application successfully");
    } 
catch (error)
  {
  console.log(error);    
  }

app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
});
