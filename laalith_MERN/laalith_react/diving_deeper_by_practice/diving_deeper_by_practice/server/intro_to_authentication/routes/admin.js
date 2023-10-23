const express = require('express');
const fs = require('fs');
// const { secretkey } = require("../user_admin_authentication/authenticate")
// const { generatetoken } = require("../user_admin_authentication/authenticate")
// const { adminAuthentication } = require("../user_admin_authentication/authenticate");
const { secretkey, generatetoken, adminAuthentication } = require("../user_admin_authentication/authenticate")
//In the above command we are importing all the necessary things required for adminAuthentication middleware.

const router = express.Router();

// Admin routes
router.get('/me',adminAuthentication,(req,res)=>{
    // logic to get the username of current user whose token is in the header
    res.status(200).send(req.admin)
  })
  
  router.post('/signup', (req, res) => {
      // logic to sign up admin
      fs.readFile(__dirname+"/../admins.json","utf-8", (err,data) => {
        if(err)
        {
          res.status(500).send("An error from the backend")
        }
        else
        {
          let flag = 0
          let a = req.body
          let admins = JSON.parse(data)
          for(let i=0;i<admins.length;i++)
          {
            if((a.username == admins[i].username))
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
            admins.push(a)
            fs.writeFile(__dirname+"/../admins.json",JSON.stringify(admins),"utf8",(err,data) => {
              if(err)
              {
                res.status(500).send("An error from the backend")
              }
              else
              {
                let token = generatetoken(a)
                res.status(200).send({"Status": "Admin registered", "token": token})
              }
            })
          }
        }
      })
  });
  
  
  router.post('/login',(req, res) => {
      // logic to log in admin
      fs.readFile(__dirname+"/../admins.json","utf-8", (err,data) => {
          if(err)
          {
            res.status(500).send("An error from the backend")
          }
          else
          {
            let flag = 0
            let a = req.body
            let admins = JSON.parse(data)
            for(let i=0;i<admins.length;i++)
            {
              if((a.username == admins[i].username)&&(a.password == admins[i].password))
              {
                flag = 1
              }
            }
            if(flag == 1)
            {
              let token = generatetoken(a)
              res.status(200).send({"Status": "Admin login successfull", "token": token})
            }
            else
            {
              res.status(403).send("Authentication failed")
            }
          }
        })
    });
  
  
  router.post('/courses',adminAuthentication, (req, res) => {
      // logic to create a course
      fs.readFile(__dirname+"/../courses.json","utf-8",(err,data) => {
        if(err)
        {
          res.status(500).send("An error from the backend")
        }
        else
        {
          let courses = JSON.parse(data)
          let contains = false
          for(let i=0;i<courses.length;i++)
          {
            if(courses[i].title == req.body.title)
            {
              contains = true
              break
            }
          }
          if(contains)
          {
            res.status(403).send("There is already a course with title:- " + req.body.title)
          }
          else
          {
            let a = req.body
            courses.push(a)
            fs.writeFile(__dirname+"/../courses.json",JSON.stringify(courses),"utf-8",(err,data) => {
              if(err)
              {
                res.status(500).send("An error from the backend")
              }
              else
              {
                res.status(200).send("Course added")
              }
            })
          }
        }
      })
    });
  
    router.put('/courses/:title',adminAuthentication, (req, res) => {
      // logic to edit a course
      fs.readFile(__dirname+"/../courses.json","utf-8",(err,data) => {
        if(err)
          {
            res.status(500).send("an error from the backend")
          }
          else
          {
            let flag = -1
            let courses = JSON.parse(data)
            let a = req.body
            for(let i = 0; i<courses.length;i++)
            {
                if(courses[i].title == req.params.title)
                {
                  flag = i
                }
            }
            if(flag == -1)
            {
              res.status(403).send("There is no course with title:- "+req.params.title)
            }
            else
            {
              courses[flag] = a
              fs.writeFile(__dirname+"/../courses.json",JSON.stringify(courses),"utf-8", (err) => {
                if(err)
                {
                  res.status(500).send("an error from the backend")
                }
                else
                {
                  res.status(200).send("Update successfull")
                }
              })
            }
          }
      })
    });
  
  
  router.get('/courses',adminAuthentication, (req, res) => {
      // logic to get all courses
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
  
  
  router.get('/courses/:title',adminAuthentication, (req, res) => {
    // logic to get a particular course
    fs.readFile(__dirname+"/../courses.json","utf-8",(err,data) => {
      if(err)
      {
        res.status(500).send("an error from the backend")
      }
      else
      {
        let courses = JSON.parse(data)
        let flag = -1
        for(let i = 0; i<courses.length;i++)
        {
            if(courses[i].title == req.params.title)
            {
              flag = i
            }
        }
        if(flag == -1)
        {
          res.status(403).send("There is no course with title:- "+req.params.title)
        }
        else
        {
          res.status(200).send(courses[flag])
        }
      }
    })
  });


module.exports = router
//Here this router can handle all the admin routes as designed