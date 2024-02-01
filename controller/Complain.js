const Complain = require("../models/Complain");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const register = async (req, res) => {
    try {
      const { description } = req.body;
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
      const newComplain = await Complain.create({
        applicant : req.applicant.id,
        description : description,
      });
  
      res.status(201).json(newComplain);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getcomplains = async(req,res) =>{
    
        try {
          const complains = await Complain.find();
          res.status(200).json(complains);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
// Update complain status
const updatestatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { complainId } = req.params;
  
      const updatedComplain = await Complain.findByIdAndUpdate(
        complainId,
        { status },
        { new: true }
      );
  
      if (!updatedComplain) {
        return res.status(404).json({ error: 'Complain not found' });
      }
  
      res.status(200).json(updatedComplain);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  module.exports ={
    register,
    getcomplains,
    updatestatus
  }