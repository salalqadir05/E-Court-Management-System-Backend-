const nodemailer = require("nodemailer");
require("dotenv").config();
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user : 'salalqadir06@gmail.com',
        pass : process.env.STMP_PASSWORD
    }
})


const Sendmail = (req,res)=>{
    try {
        const {email,subject,message} = req.body
        // console.log("path are : ",path)
        // let convertedPath = blobURL.replace(/\//g, '\\');
        // console.log("converted path are : ",convertedPath)

        let mailOption ={
            from : 'salalqadir06@gmail.com',
            to : email,
            subject : subject ,
            text : message,
            // attachments : [
            //     {
            //         filename: filename,
            //         path : convertedPath
            //     }
            // ]
    
        }
        transporter.sendMail(mailOption,(err,info)=>{
        if(err){
            console.log("Error Occured :", err )
        }
        else
        {
            console.log("Message Successfully Send", info )
        }       
        console.log("api call ") 
        })
        res.json({msg : "Successfully Sent !"})
        

    } catch (error) {
        console.log(error)
    }
    
}


module.exports = {
    Sendmail


}