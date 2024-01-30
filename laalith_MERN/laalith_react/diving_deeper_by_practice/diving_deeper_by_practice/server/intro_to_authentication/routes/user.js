const express = require('express');
const fs = require('fs');
// const { secretkey } = require("../user_admin_authentication/authenticate")
// const { generatetoken } = require("../user_admin_authentication/authenticate")
// const { userAuthentication } = require("../user_admin_authentication/authenticate");
const { secretkey, generatetoken, userAuthentication} = require("../user_admin_authentication/authenticate")
//In the above command we are importing all the necessary things required for userAuthentication middleware.


const router = express.Router();

// User routes
router.get('/me',userAuthentication,(req,res)=>{
    // logic to get the username of current user whose token is in the header
    res.status(200).send(req.user)
  })
  
  router.post('/signup', (req, res) => {
      // logic to sign up user
      fs.readFile(__dirname+"/../users.json","utf-8", (err,data) => {
        if(err)
        {
          res.status(500).send("An error from the backend")
        }
        else
        {
          let flag = 0
          let a = req.body
          let users = JSON.parse(data)
          for(let i=0;i<users.length;i++)
          {
            if((a.username == users[i].username))
            {
              flag = 1
            }
          }
          if(flag == 1)
          {
            res.status(403).send("Username already registered")
          }
          else
          {
            users.push(a)
            fs.writeFile(__dirname+"/../users.json",JSON.stringify(users),"utf8",(err,data) => {
              if(err)
              {
                res.status(500).send("An error from the backend")
              }
              else
              {
                let token = generatetoken(a)
                res.status(200).send({"Status": "User registered", "token": token})
              }
            })
          }
        }
      })
  });
  
  
  router.post('/login',(req, res) => {
      // logic to log in user
      fs.readFile(__dirname+"/../users.json","utf-8", (err,data) => {
          if(err)
          {
            res.status(500).send("An error from the backend")
          }
          else
          {
            let flag = 0
            let a = req.body
            let users = JSON.parse(data)
            for(let i=0;i<users.length;i++)
            {
              if((a.username == users[i].username)&&(a.password == users[i].password))
              {
                flag = 1
              }
            }
            if(flag == 1)
            {
              let token = generatetoken(a)
              res.status(200).send({"Status": "User login successfull", "token": token})
            }
            else
            {
              res.status(403).send("Authentication failed")
            }
          }
        })
    });
  
  
  router.get('/courses',userAuthentication,  (req, res) => {
      // logic to list all courses
      fs.readFile(__dirname+"/../courses.json","utf-8",(err,data) => {
        if(err)
        {
          res.status(500).send("an error from the backend")
        }
        else
        {
          let courses = JSON.parse(data)
          res.status(200).json(courses)
        }
      })
    });
    
    
    router.post('/courses/:title',userAuthentication,  (req, res) => {
      // logic to purchase a course
      fs.readFile(__dirname+"/../courses.json","utf-8",(err,data) => {
        if(err)
        {
          res.status(500).send("an error from the backend")
        }
        else
        {
          let flag = -1
          let courses = JSON.parse(data)
          let p = req.params.title
          for(let i=0;i<courses.length;i++)
          {
            if(p == courses[i].title)
            {
              flag = i
            }
          }
          if(flag == -1)
          {
            res.status(403).send("there is no such course as "+p)
          }
          else
          {
            fs.readFile(__dirname+"/../purchases.json","utf-8",(err,data) => {
              if(err)
              {
                res.status(500).send("An error from the backend")
              }
              else
              {
                let purchases = JSON.parse(data)
                let a = courses[flag]
                let user = req.user
                a.user = user
                purchases.push(a)
                fs.writeFile(__dirname+"/../purchases.json",JSON.stringify(purchases),"utf-8",(err,data) => {
                  if(err)
                  {
                    res.status(500).send("An error from the backend")
                  }
                  else
                  {
                    res.status(200).send("Course Purchased")
                  }
                })
              }
            })
          }
        }
      })
    });
    
    
    router.get('/purchasedCourses',userAuthentication,  (req, res) => {
      // logic to view purchased courses
      fs.readFile(__dirname+"/../purchases.json","utf-8",(err,data) => {
        if(err)
        {
          res.status(500).send("an error from the backend")
        }
        else
        {
          let user = req.user
          let purchases = []
          let allpurchases = JSON.parse(data)
          for(let i=0;i<allpurchases.length;i++)
          {
            if(allpurchases[i].user == user)
            {
              purchases.push(allpurchases[i])
            }
          }
          res.status(200).json(purchases)
        }
      })
    });


module.exports = router
//Here this router can handle all the user routes as designed