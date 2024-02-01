

 const router = require('express').Router();
 const {register,login,fetchdetails,updatedetails} = require("../controller/applicantController");

 router.post("/register",register);
 router.post("/login",login);
 router.post("/fetchdetails",fetchdetails);
 router.put("/updateapplicant/:id",updatedetails);






 module.exports = router ;