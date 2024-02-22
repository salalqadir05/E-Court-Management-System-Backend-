

const router = require('express').Router();
const {registerCase,fetch_and_count_Cases,AddCaseStatus,updateDate,fetchlawyercases,checklawyersubmittedcasestatus,assignajudge,assignacourt,updatecomments,registerCasebyApplicant,fetchApplicantcases,uploaddocument} = require("../controller/caseController");

router.post("/registercase",registerCase);
router.post("/countandfetchcases",fetch_and_count_Cases);
router.put("/addcasestatus",AddCaseStatus);
router.put("/updatehearningdate",updateDate)
router.get("/lawyerscases",fetchlawyercases)
router.post("/lawyercasestatus",checklawyersubmittedcasestatus)
router.put("/addjudge",assignajudge)
router.put("/addcourt",assignacourt)
router.put("/addcomments",updatecomments)
router.post("/addcasebyapplicant",registerCasebyApplicant)
router.get("/fetchcasebyapplicant",fetchApplicantcases)
router.put("/uploaddocument",uploaddocument)

module.exports = router ;