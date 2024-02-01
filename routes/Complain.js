

const router = require('express').Router();
const {
    register,
    getcomplains,
    updatestatus
} = require("../controller/Complain");


router.post("/addcomplain",register)
router.get("/addcomplain",getcomplains)
router.put("/updatecomplain",updatestatus)

module.exports = router ;