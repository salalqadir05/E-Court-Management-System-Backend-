const Article = require("../models/Aritcle")
const jwt = require('jsonwebtoken');

const writearticle = async (req,res)=>{
    const {title,description} = req.body
    const token = req.header('auth-token');
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
     req.lawyer = data.checklawyer
     console.log("lawyer :", req.lawyer)

   }
  })
  try {
   
  const article = new Article ({
    title,description,lawyer : req.lawyer.id
  })
  const saveArticle = await article.save();
  res.json({saveArticle,Status : true , msg : "Successfully Article Added By Lawyer"}) 
  } catch (error) {
    console.log(error)
  }
}
const fetcharticle = async (req,res)=>{

    const token = req.header('auth-token');
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
     req.lawyer = data.checklawyer
     console.log("lawyer :", req.lawyer)

   }
  })
try {
  const lawyerArticle = await Article.find({lawyer : req.lawyer.id})
  res.json({lawyerArticle,status : true})
} catch (error) {
  console.log(error)
}
}
const updatearticle = async(req,res)=>
{
  const {title,description} = req.body;
  const token = req.header('auth-token');
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
     req.lawyer = data.checklawyer
   }
  })
 
try {
   let newarticle = {};
if(title){newarticle.title = title}
if(description){newarticle.description = description}

let article = await Article.findById(req.params.id)

if(article.lawyer.toString() !== req.lawyer.id)
{
   return res.status(401).send("Not Allowed");
}

article = await Article.findByIdAndUpdate(req.params.id ,{$set:newarticle},{new:true})
res.json({article})   
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal Server Error");
}

}
const findOneArticle = async(req,res)=>{
  const articleId = req.body; // assuming the articleId is passed in the request body
  console.log("article item id is:", articleId);

  try {
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const deletearticle = async(req,res)=>{
  const token = req.header('auth-token');
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
     req.lawyer = data.checklawyer
   }
  })

try {
let article = await Article.findById(req.params.id)

if(article.lawyer.toString() !== req.lawyer.id)
{
   return res.status(401).send("Not Allowed");
}

article = await Article.findByIdAndDelete(req.params.id )
res.json("successfully deleted")   
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal Server Error");
}

}
module.exports = {
    writearticle,
    fetcharticle,
    updatearticle,
    deletearticle,
    findOneArticle
}