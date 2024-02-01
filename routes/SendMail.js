const router = require('express').Router();


const {Sendmail } = require("../controller/SendMail")


router.post("/sendmail",Sendmail)


module.exports = router;
