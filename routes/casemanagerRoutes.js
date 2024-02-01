
const router = require('express').Router();
const {register,login,fetchdetails,updateDetails,getdetailone} = require("../controller/CaseManager");


router.post("/registercasemanager",register);
router.post("/logincasemanager",login);
router.post("/fetchallemployees",fetchdetails);
router.put("/updatecasemanager/:id", updateDetails);
router.get("/fetchadmin", updateDetails);




module.exports = router ;

