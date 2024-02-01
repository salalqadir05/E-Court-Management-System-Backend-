const jwt = require('jsonwebtoken');
const JWT_SECRET1 = process.env.JWT_SECRET;


const fetchlawyer = (req, res, next) =>
 {
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token if in" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET1);
        req.lawyer = data.lawyer;
        console.log("Lawyer Middle Ware is ok")
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token catch in " })
                       
    }

}

module.exports = fetchlawyer