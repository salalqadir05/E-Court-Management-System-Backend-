const Applicant = require("../models/Applicant");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const register = async(req,res,next) =>{

try {
    const {Firstname,Lastname,Email,Cnic,Password} = req.body;
    const checkExistedUser = await Applicant.findOne({ Email});
    if(checkExistedUser)
    {
        res.json({msg : "User already Existed ",status : false});
    }
    const salt = await bcrypt.genSalt(10);
    const Sec_Password = await bcrypt.hash(Password,salt);
    
    const applicant = await Applicant.create({
    Firstname,Lastname,Email,Cnic
    ,
    Password : Sec_Password
    })
    
    delete applicant.Password;
    return res.json({status : true , applicant});        
} catch (next) {
    console.log(next);
}

}
const login = async(req,res,next) =>{
    try {
        const {Email,Password} = req.body;
        const checkApplicant = await Applicant.findOne({ Email });
        if(!checkApplicant)
        {
            res.json({status :false, msg : "This Applicant is already existed "});
        }
        const compare_Password = await bcrypt.compare(Password,checkApplicant.Password);
        if(!compare_Password)
        {
            return res.status(400).json({ error: "Please try to login with correct credentials",status :false });
        }
        const data = {
            checkApplicant : {
                id : checkApplicant.id
            }
        }
const auth_Token = jwt.sign(data,process.env.JWT_SECRET);
        delete checkApplicant.Password;
        res.json({status : true ,checkApplicant,auth_Token});

    } catch (error) {
        console.log(error);
    }
}
const fetchdetails = async (req,res,next)=>{
    try {
        const Applicantlist = await Applicant.find().select('-Password');
        const count = Applicantlist.length;
        res.json({count,Applicantlist});
    } catch (error) {
        console.log(error);
    }
}
const updatedetails = async(req, res) => {
    try {
      const { id } = req.params;
      const {Firstname,Lastname,Email,Cnic } = req.body;
  
      // You may want to add additional validation here before proceeding
  
      // Update lawyer details
      const updatedapplicant = await Applicant.findByIdAndUpdate(
        id,
        {
            Firstname,
            Lastname,
            Email,
             Cnic,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedapplicant) {
        return res.status(404).json({ error: 'Applicant not found', status: false });
      }
  
      // You may want to remove sensitive information from the response
      delete updatedapplicant.Password;
  
      res.json({ status: true, updatedapplicant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', status: false });
    }
}
module.exports ={
    register,
    login,
    fetchdetails,
    updatedetails
}