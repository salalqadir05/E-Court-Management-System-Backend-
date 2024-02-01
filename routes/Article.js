const router = require('express').Router();

const {writearticle,fetcharticle,updatearticle,deletearticle,findOneArticle} = require("../controller/Article")


router.post("/addarticle",writearticle)
router.get("/viewarticle",fetcharticle)
router.put("/updatearticle/:id",updatearticle)
router.delete("/deletearticle/:id",deletearticle)
router.post("/findarticle",findOneArticle)

module.exports = router ;