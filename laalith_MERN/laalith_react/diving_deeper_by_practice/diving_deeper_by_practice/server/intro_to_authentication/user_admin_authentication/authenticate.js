const fs = require('fs');
const jwt = require('jsonwebtoken');

const secretkey = "difuhygdsbfisdybguiewfksdfubw" //this is the secret key we will be using for encryption
function generatetoken(data)
{
    return (jwt.sign(data, secretkey,{expiresIn: "1h"}));
}


function adminAuthentication(req,res,next)
{
  let error = false  
  fs.readFile(__dirname+"/../admins.json","utf-8", (err,data) => {
    if(err)
    {
      res.status(500).send("An error from the backend")
    }
    else
    {
        let flag = 0
        let admins = JSON.parse(data)
        let authHeader = req.headers.authorization
        let username = ""
        let password = ""
        let authhead = authHeader.split(" ")
        let token = authhead[1]
        jwt.verify(token,secretkey, (err,credentials) =>{
            if(err)
            {
                res.status(403).send("Authentication failed\nInvalid token or token expired\nlogin again to generate a new token")
                error = true
            }
            else
            {
                username = credentials.username
                password = credentials.password
                req.admin = username
            }
        })
        if(!error)
        {
            for(let i=0;i<admins.length;i++)
            {
                if((username == admins[i].username)&&(password == admins[i].password))
                {
                    flag = 1
                }
            }
            if(flag == 1)
            {
                next();
            }
            else
            {
                res.status(403).send("Authentication failed")
            }
        }
    }
  })
}
function userAuthentication(req,res,next)
{
    let error = false  
  fs.readFile(__dirname+"/../users.json","utf-8", (err,data) => {
    if(err)
    {
      res.status(500).send("An error from the backend")
    }
    else
    {
        let flag = 0
        let users = JSON.parse(data)
        let authHeader = (req.headers.authorization)
        let username = ""
        let password = ""
        let authhead = authHeader.split(" ")
        let token = authhead[1]
        jwt.verify(token,secretkey, (err,credentials) =>{
            if(err)
            {
                res.status(403).send("Authentication failed\nInvalid token or token expired\nlogin again to generate a new token")
                error = true
            }
            else
            {
                username = credentials.username
                password = credentials.password
                req.user = username
            }
        })
        if(!error)
        {
            for(let i=0;i<users.length;i++)
            {
                if((username == users[i].username)&&(password == users[i].password))
                {
                    flag = 1
                }
            }
            if(flag == 1)
            {
                next();
            }
            else
            {
                res.status(403).send("Authentication failed")
            }
        }
    }
  })
}

module.exports = {
    adminAuthentication,
    userAuthentication,
    secretkey,
    generatetoken
}
//This above method is known as destructuring
//here in the above command we exporting all the necessary things in the form of json to accomplish a valid authentication
//these functions/variables can be imported by other files