
const router = require('express').Router();
const {register,login,fetchdetails,updatedetails} = require("../controller/LawyerController");


router.post("/registerlawyer",register);
router.post("/loginlawyer",login);
router.post("/fetchdatalawyer",fetchdetails);
router.put("/updatelawyer/:id",updatedetails)

module.exports = router ;

