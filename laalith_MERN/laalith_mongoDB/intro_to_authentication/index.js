//When you are done understanding this code please go to index2.js file in this same directory to learn advanced concepts
//used for authentication in a secure way like JWT(JSON web tokens)
//In order for this code to work make sure there are four files with json extensions:- users, admins, courses, purchases
//Make sure that these files consists a single array in each of them, which can store multiple objects
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
//before we used bodyparser library to get data from the body but now we will use
//express.json() middleware to get data from the body, because after the express
//version 4.16.0, body-parser library got included in express itself so we can use express.json() instead of bodyparser.json()

//let's now define two middlewares which will help in authenticating admins and users
function adminAuthentication(req,res,next)
{
  //this function is middleware for admin routes which will check whether the person opening the routes
  //is an admin or not. It authenticates people whether they are admin or not based on the header information
  //In our program any route (except signup routes) will have middlewares which will check whether the person can access the route or not
  //And the username and password of the person is stated in the headers(this has to be made sure of).
  fs.readFile("admins.json","utf-8", (err,data) => {
    if(err)
    {
      res.status(500).send("An error from the backend")
    }
    let flag = 0
    let admins = JSON.parse(data)
    for(let i=0;i<admins.length;i++)
    {
      if((req.headers.username == admins[i].username)&&(req.headers.password == admins[i].password))
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
  })
}
function userAuthentication(req,res,next)
{
  //this function is middleware for user routes 
  fs.readFile("users.json","utf-8", (err,data) => {
    if(err)
    {
      res.status(500).send("An error from the backend")
    }
    let flag = 0
    let users = JSON.parse(data)
    for(let i=0;i<users.length;i++)
    {
      if((req.headers.username == users[i].username)&&(req.headers.password == users[i].password))
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
  })
}


// Admin routes
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
            res.status(200).send("Admin registered")
          }
        })
      }
    }
  })
});

//now in the below route, before logging in we can use adminAuthentication middleware to check whether the person
//can login or not. If next() is executed in the middleware then the admin is an authorized personnel
//then we just send login successfull
//here you might see that post is taking 3 arguments. The second argument is an argument for middleware
//post,get,put,...,etc. all these can take infinite arguments but the only thing fixed here is
//first argument shall always be the route and the last argument shall always be the route handler i.e. function executed after a route is hit.
app.post('/admin/login',adminAuthentication, (req, res) => {
  // logic to log in admin
  res.status(200).send("Admin login successfull")
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



// User routes
/*
Now whenever it's necessary we will use userAuthentication middleware
*/
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
            res.status(200).send("User registered")
          }
        })
      }
    }
  })
});


app.post('/user/login',userAuthentication, (req, res) => {
  // logic to log in user
  res.status(200).send("User Login successfull")
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
            let user = req.headers.username
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
      let user = req.headers.username
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

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

//now go to index2.js file to learn how implement jwt for this same application logic so that we can perform authentication
//in a more secure way instead of just having username and password everytime in the header whenever we access a route.