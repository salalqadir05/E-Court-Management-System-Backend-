const Lawyer = require("../models/Lawyer");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const register = async(req,res,next) =>{

try {
    const {name,Cnic,Email,Lawyer_License_No,Password} = req.body;
    const checkExistedUser = await Lawyer.findOne({ Email});
    if(checkExistedUser)
    {
        res.json({msg : "User already Existed ",status : false});
    }
    const salt = await bcrypt.genSalt(10);
    const Sec_Password = await bcrypt.hash(Password,salt);
    
    const lawyer = await Lawyer.create({
        name,Cnic,Email,Lawyer_License_No
    ,
    Password : Sec_Password
    })
    const auth_Token = jwt.sign(data,process.env.JWT_SECRET);

    delete lawyer.Password;

    return res.json({status : true , lawyer,auth_Token});        
} catch (next) {
    console.log(next);
}

}
const login = async(req,res,next) =>{
    try {
        const {Email,Password} = req.body;
        const checklawyer = await Lawyer.findOne({ Email });
        if(!checklawyer)
        {
            res.json({status :false, msg : "This lawyer is already existed "});
        }
        const compare_Password = await bcrypt.compare(Password,checklawyer.Password);
        if(!compare_Password)
        {
            return res.status(400).json({ error: "Please try to login with correct credentials",status :false });
        }
        const data = {
            checklawyer : {
                id : checklawyer.id
            }
        }
const auth_Token = jwt.sign(data,process.env.JWT_SECRET);
        delete checklawyer.Password;
        res.json({status : true ,checklawyer,auth_Token});
        console.log(auth_Token)
    } catch (error) {
        console.log(error);
    }
}
const fetchdetails = async (req,res,next)=>{
    try {
        const Lawyerlist = await Lawyer.find().select('-Password');
    const count = Lawyerlist.length; 
        res.json({count,Lawyerlist});
    } catch (error) {
        console.log(error);
    }
}
const updatedetails = async(req, res) => {
    try {
      const { id } = req.params;
      const { name, Cnic, Email, Lawyer_License_No, Password } = req.body;
  
      // You may want to add additional validation here before proceeding
  
      // Update lawyer details
      const updatedLawyer = await Lawyer.findByIdAndUpdate(
        id,
        {
          name,
          Cnic,
          Email,
          Lawyer_License_No,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedLawyer) {
        return res.status(404).json({ error: 'Lawyer not found', status: false });
      }
  
      // You may want to remove sensitive information from the response
      delete updatedLawyer.Password;
  
      res.json({ status: true, updatedLawyer });
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