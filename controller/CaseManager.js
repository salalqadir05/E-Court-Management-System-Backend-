const CaseManager = require("../models/CaseManager");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const register = async(req,res,next) =>{

try {
    const {name,Title,Email,Designation,Password} = req.body;
    const checkExistedUser = await CaseManager.findOne({ Email});
    if(checkExistedUser)
    {
        res.json({msg : "User already Existed ",status : false});
    }
    const salt = await bcrypt.genSalt(10);
    const Sec_Password = await bcrypt.hash(Password,salt);
    
    const casemanager = await CaseManager.create({
        name,Title,Email,Designation
    ,
    Password : Sec_Password
    })
    
    delete casemanager.Password;
    return res.json({status : true , casemanager});        
} catch (err) {
    console.log(err);
}

}
const login = async(req,res,next) =>{
    try {
        const {Email,Password} = req.body;
        const checkcasemanager = await CaseManager.findOne({ Email });
        if(!checkcasemanager)
        {
            res.json({status :false, msg : "This lawyer is already existed "});
        }
        const compare_Password = await bcrypt.compare(Password,checkcasemanager.Password);
        if(!compare_Password)
        {
            return res.json({ error: "Please try to login with correct credentials",status :false });
        }
        const data = {
            checkcasemanager : {
                id : checkcasemanager.id
            }
        }
const auth_Token = jwt.sign(data,process.env.JWT_SECRET);
        delete checkcasemanager.Password;
        res.json({status : true ,checkcasemanager,auth_Token});

    } catch (error) {
        console.log(error);
    }
}
const fetchdetails = async (req,res,next)=>{
    try {
        const Employeelist = await CaseManager.find().select('-Password');
        const countEmployee = Employeelist.length
        res.json({Employeelist,countEmployee});
    } catch (error) {
        console.log(error);
    }
    }
const updateDetails = async (req, res, next) => {
        try {
          const { id } = req.params;
          const { name, Title, Email, Designation } = req.body;
      
          const updatedCaseManager = await CaseManager.findByIdAndUpdate(
            id,
            { name, Title, Email, Designation },
            { new: true } // Return the updated document
          );
      
          if (!updatedCaseManager) {
            return res.status(404).json({ error: "CaseManager not found" });
          }
      
          delete updatedCaseManager.Password;
          res.json({ status: true, updatedCaseManager });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      };
const fetchcasemanager = async(req,res)=>{
   try {
    const lawyer = await CaseManager.findOne({id : req.body.lawyerid})
    res.json({lawyer})
   } catch (error) {
    console.log(error)
   }
    
}
module.exports ={
    register,
    login,
    fetchdetails,
    updateDetails,
    fetchcasemanager
}