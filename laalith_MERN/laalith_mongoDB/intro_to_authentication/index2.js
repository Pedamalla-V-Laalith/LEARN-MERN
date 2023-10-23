/*
While executing this code you gotta make sure about few things:-
always while signing up or logging in eneter your credentials in the body
after you get a token it will be only valid for one hour while the code is running
any token shall be entered in authorization key in the headers like this:- "Bearer sgdfvhgsbvfsd......(token)"
All these things will be understood by you later on
entry of courses format should be:- {"title": "....", "description": "....", "price": "...."}
entry of credentials format should be :- {"username": "....", "password": "...."}
*/
const express = require('express');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors')
//install the above module by running a command npm install jsonwebtoken
/*
jwt also known as JSON web token is an open standard that defines a compact way for securely sharing 
information between two parties: a client and a server.
what jwt does is it encrypts/performs_hashing a/on_a message or any content for that matter and gives us a token
which is basically a gibberish string which can only be decode by jwt itself. we can even provide a key for encryption and decryption
of our data.
And also in order to provide maximum security we can set a timelimit for which the token will be valid.
now in our application:-
We now need to implement actual authentication here. We're going to use Json Web Tokens (JWT) for the same. When the user signs up,
they should get back a jwt that is valid for 1 hour. They should then send just that jwt vs sending username and password to the authenticated routes.
*/

/*
In order to do this we will use a logic of generating a token for the user or admin of one hour whenever they signup or login
but remember since you can signup only once, when your current token expires you need to login again in order to generate a new token
*/
app.use(cors())
app.use(express.json())
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
const secretkey = "difuhygdsbfisdybguiewfksdfubw" //this is the secret key we will be using for encryption
function generatetoken(data)
{
    return (jwt.sign(data, secretkey,{expiresIn: "1h"}));
}
//the above function will generate a token which is basically the encryption of data
//the object with element/key expiresIn: "1h" basically indicates that the token generated will be valid for only an hour

function adminAuthentication(req,res,next)
{
  let error = false  
  fs.readFile("admins.json","utf-8", (err,data) => {
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
        //please keep in mind that the token which you get will actually be passed as a value of authorization key in the headers
        // and the value will be passed like this:- "authorization": "Bearer fdhbvjerhbfvbcv37893rb(gibberish token)"
        // there will be a bearer in front of the token. So make sure when you get the value of req.headers.authorization,
        // if you want just the token split the string of the substring "bearer"
        let authhead = authHeader.split(" ")
        let token = authhead[1]
        //the above line will get us just the token since the token string and bearer string are separated from a space
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
                //here in the above we are creating our own key admin in the request object
                //we are doing this so that it might come in handy to know which admin is accessing a specific route 
            }
        })
        //this above function will decrypt the token using the same token which will give us the original data
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
  fs.readFile("users.json","utf-8", (err,data) => {
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
                //here in the above we are creating our own key user in the request object
                //we are doing this so that it might come in handy to know which user is accessing a specific route
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

/*
After generating a token by signing up or logging in these middlewares are used in further routes to check
whether the token in header is valid or not
these middlewares will decrypt the token and then authenticate the data, if the data matches then these middlewares will allow the user or admin
to access the routes they want to access
*/

// Admin routes
app.get('/admin/me',adminAuthentication,(req,res)=>{
  // logic to get the username of current user whose token is in the header
  res.status(200).send(req.admin)
})

app.post('/admin/signup', (req, res) => {
    // logic to sign up admin
    fs.readFile("admins.json","utf-8", (err,data) => {
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
          fs.writeFile("admins.json",JSON.stringify(admins),"utf8",(err,data) => {
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


app.post('/admin/login',(req, res) => {
    // logic to log in admin
    //unlike the previous file (index.js) here the user needs to give his credentials in the body itself
    fs.readFile("admins.json","utf-8", (err,data) => {
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


app.post('/admin/courses',adminAuthentication, (req, res) => {
    // logic to create a course
    fs.readFile("courses.json","utf-8",(err,data) => {
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
          fs.writeFile("courses.json",JSON.stringify(courses),"utf-8",(err,data) => {
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

  app.put('/admin/courses/:title',adminAuthentication, (req, res) => {
    // logic to edit a course
    fs.readFile("courses.json","utf-8",(err,data) => {
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
            fs.writeFile("courses.json",JSON.stringify(courses),"utf-8", (err) => {
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


app.get('/admin/courses',adminAuthentication, (req, res) => {
    // logic to get all courses
    fs.readFile("courses.json","utf-8",(err,data) => {
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


app.get('/admin/courses/:title',adminAuthentication, (req, res) => {
  // logic to get a particular course
  fs.readFile("courses.json","utf-8",(err,data) => {
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


// User routes
app.get('/user/me',userAuthentication,(req,res)=>{
  // logic to get the username of current user whose token is in the header
  res.status(200).send(req.user)
})

app.post('/user/signup', (req, res) => {
    // logic to sign up user
    fs.readFile("users.json","utf-8", (err,data) => {
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
          fs.writeFile("users.json",JSON.stringify(users),"utf8",(err,data) => {
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


app.post('/user/login',(req, res) => {
    // logic to log in user
    //unlike the previous file (index.js) here the user needs to give his credentials in the body itself
    fs.readFile("users.json","utf-8", (err,data) => {
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


app.get('/user/courses',userAuthentication,  (req, res) => {
    // logic to list all courses
    fs.readFile("courses.json","utf-8",(err,data) => {
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
  
  
  app.post('/user/courses/:title',userAuthentication,  (req, res) => {
    // logic to purchase a course
    fs.readFile("courses.json","utf-8",(err,data) => {
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
          fs.readFile("purchases.json","utf-8",(err,data) => {
            if(err)
            {
              res.status(500).send("An error from the backend")
            }
            else
            {
              let purchases = JSON.parse(data)
              let a = courses[flag]
              let user = req.user//req.user is defined in the middleware
              a.user = user
              /*
              Here you might notice we are adding another key "user" with value of username of the person buying to the object a 
              we are doing this to make sure that in purchase 
              */
              purchases.push(a)
              fs.writeFile("purchases.json",JSON.stringify(purchases),"utf-8",(err,data) => {
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
  
  
  app.get('/user/purchasedCourses',userAuthentication,  (req, res) => {
    // logic to view purchased courses
    fs.readFile("purchases.json","utf-8",(err,data) => {
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