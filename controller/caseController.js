
const Case = require("../models/Case");
const fetchlawyer = require("../Middleware/fetchlawyer")
const jwt = require('jsonwebtoken');
require("dotenv").config();
// Example usage
const registerCasebyApplicant = async(req,res)=>{
  try {
    let {Case_Details,Case_Type,Case_Files,Lawyer_Lisence_Number,
      Lawyer_Name,CaseNumber,Case_Hearning_Date,Case_Status,checkpriority
    } = req.body;
    const capital = Case_Type;
    if (capital) {
      var words = capital.split(" ");
    } else {
      console.error('The variable "capital" is undefined.');
    }
    var firstword = words[0];
    function generateUniqueRandomNumber() {
      const minRange = 100000n;
      const maxRange = 999999n;
    
      const timestamp = BigInt(Date.now());
      const randomPortion = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    
      const uniqueNumber = (timestamp + randomPortion) % (maxRange - minRange + 1n) + minRange;
    
      return uniqueNumber;
    
    }
    let strCase = `CASE-${firstword.toUpperCase()}-${generateUniqueRandomNumber()}`

    console.log(strCase );
    CaseNumber = strCase;
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token if in" })
    }
        const jt =process.env.JWT_SECRET ;
         jwt.verify(token, jt,(err,data)=>{
          if(err)
          {
            res.json(err)
          }
          else{
          //  data = decoded;
            req.applicant = data.checkApplicant

          }
        });
        const cases = new Case({
          Case_Details,Case_Type,Case_Files,Lawyer_Lisence_Number,
      Lawyer_Name,CaseNumber,Case_Hearning_Date,Case_Status,checkpriority,
      applicant : req.applicant.id
        })
        const caseSave = await cases.save();
        res.json({caseSave, Status : true , msg : "Successfully Case Register By Applicant",CaseNumber : strCase})
        // console.log("data is :",data)
        // req.lawyer = data.checklawyer;
        // console.log(req.lawyer)
        // console.log("Lawyer
  }
catch(error)
{
  if (error.code === 11000 && error.keyPattern && error.keyValue) {
    // Duplicate key error, handle it here
    console.error(`Duplicate key error for CaseNumber: ${error.keyValue.CaseNumber}`);
    res.status(400).send({ error: "Duplicate CaseNumber. Please use a unique CaseNumber." });
  } else {
    // Handle other errors
    console.error(error);
    res.status(500).send({ status : false , error: "Internal Server Error" });
  } //   //  
  };
}
const fetchApplicantcases = async(req,res)=>{
  const token = req.header('auth-token');
  if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token if in" })
  }
  const jt =process.env.JWT_SECRET ;
  jwt.verify(token, jt,(err,data)=>{
   if(err)
   {
     res.json(err)
   }
   else{
   //  data = decoded;
     req.applicant = data.checkApplicant


   }
  })
  try {
    const cases = await Case.find({applicant : req.applicant.id})
    console.log(cases)

res.json ({cases , caseNo : cases.CaseNumber})    
  } catch (error) {
    console.log(error)
  }
}
const registerCase = async (req, res) => {
  try {
    let {Case_Details,Case_Type,Case_Files,Lawyer_Lisence_Number,
      Lawyer_Name,CaseNumber,Case_Hearning_Date,Case_Status
    } = req.body;
    const capital = Case_Type;
    if (capital) {
      var words = capital.split(" ");
    } else {
      console.error('The variable "capital" is undefined.');
    }
    var firstword = words[0];
    function generateUniqueRandomNumber() {
      const minRange = 100000n;
      const maxRange = 999999n;
    
      const timestamp = BigInt(Date.now());
      const randomPortion = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    
      const uniqueNumber = (timestamp + randomPortion) % (maxRange - minRange + 1n) + minRange;
    
      return uniqueNumber;
    
    }
    let strCase = `CASE-${firstword.toUpperCase()}-${generateUniqueRandomNumber()}`

    console.log(strCase );
    CaseNumber = strCase;
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token if in" })
    }
        const jt =process.env.JWT_SECRET ;
         jwt.verify(token, jt,(err,data)=>{
          if(err)
          {
            res.json(err)
          }
          else{
          //  data = decoded;
            req.lawyer = data.checklawyer

          }
        });
        const cases = new Case({
          Case_Details,Case_Type,Case_Files,Lawyer_Lisence_Number,
      Lawyer_Name,CaseNumber,Case_Hearning_Date,Case_Status,
      lawyer : req.lawyer.id
        })
        const caseSave = await cases.save();
        res.json({caseSave, Status : true , msg : "Successfully Case Register By Lawyer",CaseNumber : strCase})
        // console.log("data is :",data)
        // req.lawyer = data.checklawyer;
        // console.log(req.lawyer)
        // console.log("Lawyer
  }
catch(error)
{
  if (error.code === 11000 && error.keyPattern && error.keyValue) {
    // Duplicate key error, handle it here
    console.error(`Duplicate key error for CaseNumber: ${error.keyValue.CaseNumber}`);
    res.status(400).send({ error: "Duplicate CaseNumber. Please use a unique CaseNumber." });
  } else {
    // Handle other errors
    console.error(error);
    res.status(500).send({ status : false , error: "Internal Server Error" });
  } //   //  
  };
}
const fetchlawyercases =  async(req,res)=>{
  const token = req.header('auth-token');
  if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token if in" })
  }
  const jt =process.env.JWT_SECRET ;
  jwt.verify(token, jt,(err,data)=>{
   if(err)
   {
     res.json(err)
   }
   else{
   //  data = decoded;
     req.lawyer = data.checklawyer
     console.log("lawyer :", req.lawyer)

   }
  })
  try {
    const cases = await Case.find({lawyer : req.lawyer.id})
    console.log(cases)

res.json ({cases , caseNo : cases.CaseNumber})    
  } catch (error) {
    console.log(error)
  }

}
const fetch_and_count_Cases = async(req,res)=>{
try {
  const CasesList = await Case.find();

const count = CasesList.length ;
res.json({count , CasesList });
} catch (error) {
console.log(error)  
}
}
const AddCaseStatus = async (req, res) => {
  try {
    const { caseId, CaseStatus } = req.body;
    const existingCase = await Case.findById(caseId);
    
    // Use findByIdAndUpdate with the correct syntax
    const updateCaseStatus = await Case.findByIdAndUpdate(
      caseId,
      { Case_Status: CaseStatus },
      { new: true }
    )

    if (!updateCaseStatus) {
      return res.status(404).json({ status: false, error: 'Case not found' });
    }

    res.json({ status: true, updateCaseStatus });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};
const updateDate = async (req, res) => {
  try {
    const { caseId,Case_Hearing_Date } = req.body;
    console.log(caseId, Case_Hearing_Date );

    const updateCaseHearingDate = await Case.findByIdAndUpdate(
      caseId,
      { Case_Hearing_Date: Case_Hearing_Date },
      { new: true }
    );

    if (!updateCaseHearingDate) {
      return res.status(404).json({ status: false, error: 'Case not found' });
    }

    res.json({ status: true, updateCaseHearingDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};
const checklawyersubmittedcasestatus = async(req,res)=>{
  const caseno = req.body.CaseNumber
  const casestatus = await Case.findOne({CaseNumber :caseno})
// console.log(casestatus)
  if(!casestatus)
  {
    res.status(401).send({ error: "Case is Not existed" })
  }

    res.json({StatusofCase : casestatus.Case_Status,comments : casestatus.Comments_Reader })
}
const assignajudge = async(req,res) =>{
  try {
    const { caseId,judgename } = req.body;

    const updateCasejudgename = await Case.findByIdAndUpdate(
     {_id :  caseId},
      {$set: {  judgenames :judgename}},
      { new: true }
    );

    if (!updateCasejudgename) {
      return res.status(404).json({ status: false, error:'Judge is not added' });
    }

    res.json({ status: true, updateCasejudgename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }

}
const assignacourt = async(req,res) =>{
  try {
    const { caseId,courtdetails } = req.body;
    const updateCasecourt = await Case.findByIdAndUpdate(
     {_id :  caseId},
      {$set: {  Court_details :courtdetails}},
      { new: true }
    );

    if (!updateCasecourt) {
      return res.status(404).json({ status: false, error:'Judge is not added' });
    }

    res.json({ status: true, updateCasecourt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }

}
const updatecomments = async(req,res)=>{
  try {
    const { caseId,casecomments } = req.body;
    const updateCasecomments = await Case.findByIdAndUpdate(
     {_id :  caseId},
      {$set: {  Comments_Reader :casecomments}},
      { new: true }
    );

    if (!updateCasecomments) {
      return res.status(404).json({ status: false, error:'Comments are not added' });
    }

    res.json({ status: true, updateCasecomments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }

}

const uploaddocument = async(req,res)=>{
 try{
  const {caseid,newfilename, newpath} = req.body;
  console.log(caseid,newfilename, newpath)
  const uploadfile = Case.findByIdAndUpdate(
     caseid,
    {filename : newfilename},
    {new : true}
  )

  

  res.json({ message: 'File updated successfully.',uploadfile});
} catch (error) {
  console.error('Error updating file:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
};

module.exports = {
  registerCase,
  fetch_and_count_Cases,
  AddCaseStatus,
  updateDate,
  fetchlawyercases,
  checklawyersubmittedcasestatus,
  assignajudge,
  assignacourt,
  updatecomments,
  registerCasebyApplicant,
  fetchApplicantcases,
  uploaddocument

};
