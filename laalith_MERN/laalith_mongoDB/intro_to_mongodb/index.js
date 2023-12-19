/*
Till now we worked with normal variables and files to store our data
now we will store our data in databases using mongo DataBase
we will implement this logic on a project which we already did previously
that is the course storing app.
*/

/*
Similar to that app the schemes of users, admins, and courses will be:-
(Note:- Schemes are basically formats like mentioned below):-
admin:-
{
    "username": "...." (note:- string datatype)
    "password": "...." (note:- string datatype)
}
course:-
{
    "title": "...." (note:- string datatype)
    "description": "...." (note:- string datatype)
    "price": "...." (note:- string datatype)
}
user:-
{
    "username": "...." (note:- string datatype)
    "password": "...." (note:- string datatype)
    "purchasedCourses": .... 
}
all the above formats are basically schemas
(Note:- right now you might notice that instead of separate scheme for purchasedCourses we just included it in the userSchema
    we did this because it will be easier for us to just insert only those courses which a user purchased in purchasedCourses key and get that data when needed
    instead of searching through a whole other database/file for purchasedCourses and getting the relevant information)
*/
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
/*
In order to work with mongodb import this above library after installing it
*/
const app = express();

app.use(express.json())
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
const secretkey = "difuhy3sbfisd7bgu4e6fksd9ubw" //this is the secret key we will be using for encryption
function generatetoken(data)
{
    return (jwt.sign(data, secretkey,{expiresIn: "1h"}));
}
//Now let us define some mongoose Schemes:-
const userSchema = new mongoose.Schema({
    username: String,
    password: {type: String},
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
})
/*
okay now this may seem very confusing so let us understand slowly what this means
here we are implying that the username keys will have values which are in String datatype
Even for password we are doing the same thing but with different syntax. type key is just used as something which specifies the datatype
that needs to be stored. Don't mistake that password will have an object stored in it, password will just hold a simple string. We can indicate this
by using an object {type: String}. if you want it to be int or something then the object will be like this:- {type: int}
Now if we want a random key let's say whose name is a, and if we want to store an array of a certain type then we shall write like:-
a: [{type: ....(datatype)}]
now let's come to the most complicated step:-
purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
here basically what we are doing is, we are intimating the server that purchasedCourses key should hold data
which has a type of certain schema's ObjectId datatype/schema, 
and this ref: "Course" will be a reference to a course table/collection_in_the_database(you will see and understand later on) where each data entry such as objects has a certain ObjectId
and this ObjectId has to be an id of something in the course collection/table which is referenced in ref: "Course".
*/
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String
})

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
//These above three lines will create 3 separate collections in a certain database(this database will be mentioned during the connection)
//which can hold the data in the format of userSchema, adminSchema, courseSchema in 
//User, Admin, Course collections respectively

//Now let's create a middleware that will decode the token recieved in the header

function authenticateJwt (req, res, next){
    let authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, secretkey, (err, user) => {
        if (err) {
          return res.status(403).send("Authentication failed\nInvalid token or token expired\nlogin again to generate a new token");
        }
        req.user = user;
        //here we are storing the user/admin credentials in the request object
        next();
      });
    } else {
      res.sendStatus(401).send("Token is missing");
    }
  }

//let's connect to the database now:-
mongoose.connect('mongodb+srv://<userid>:<password>@cluster0.uxhil6w.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Primitive_courses_app" })
//This above line let's us connect to the database which we want to work with
//note:- If you are trying this out on your own then you have to have your own cluster in mongodb and the url and dbName should also be your own url and database name.
//note:- In the url where there is <userid> insert your own userid and where there is <password> insert your own password (Don't worry you will get an idea about url when you make one cluster)
//note:- If the dbname you mentioned in your code does note exist in your cluster then don't worry when you run this code a new database with the exact name you mentioned will be created in the cluster.
/*
when you execute the mongoose.connect function with the provided configuration, 
MongoDB will automatically create a database named "courses_app" if it doesn't already exist.
This behavior is a part of MongoDB's automatic database creation feature
*/
//Now let's design route handlers and see how database data is accessed and also learn a little more about dealing with async nature


//Admin routes
app.post("/admin/signup", async (req,res)=> {
    //logic to signup an admin
    let credentials = req.body
    let admin = await Admin.findOne({username: credentials.username})
    /*
    okay now this might seem confusing but let's learn slowly what it means
    basically if you look a little above we wrote async(req,res) this means that inside this function async keywords/functions will be used
    we all know how promises work right. let us say function a returns a prmise which resembles some object
    then the execution of it will look something like this:-
    a(...).then(callback)
    and now in the callback we will work with the object:-
    function callback(obj)
    {
        console.log(obj)
    }
    Now all of this looks ridiculously complicated but there is an easier method to do it:-
    let obj = await a(...)
    console.log(obj)
    this above method does the same but instead of passing the object as an argument to callback function it basically returns the object directly that's the only difference
    */
   /*
   Now let's dissect let admin = await Admin.findOne({username: credentials.username})
   MongoDB findOne() method returns only one document that satisfies the criteria entered. 
   If the criteria entered matches for more than one document, the method returns only one document according to natural ordering, 
   which reflects the order in which the documents are stored in the database
   In the above line of code we are basically checking if any data_entry/object/document is having a key username with value of credentials.username
   and if mongodb does find some document like that then it will return a promise that resembles that particular object which satisfies {username: credentials.username}
   but since we are using the async nature to our advantage "await Admin.findOne({username: credentials.username})" This whole thing will just return the object itself
   instead of returning the promise that resembles the object. i seriously hope you understood this.
   */
  if(admin)
  {
    //checking whether the username already exists in the Admin collection
    res.status(403).send("Username already registered")
  }
  else
  {
    let newadmin = new Admin(credentials)
    await newadmin.save()//this line actually does the work of entering/saving the data in database.
    /*
    In the above two lines we are basically entering data into Admin database
    with the document having exact contents of credentials with Admin schema(obviously)
    And one more thing while entering this data mongodb automatically gives this document a new key which is ObjectId which has a unique id for the document in the database(like a primary key)
    */
   let token = generatetoken(credentials)
   res.status(200).send({"Status": "Admin registered", "token": token})
  }
})

app.post("/admin/login", async(req,res) => {
    //logic for admin login
    let credentials = req.body
    let admin = await Admin.findOne({username: credentials.username, password: credentials.password})
    if(admin)
    {
        let token = generatetoken(credentials)
        res.status(200).send({"Status": "Admin login successfull", "token": token})
    }
    else
    {
        res.status(403).send("Login failed\nInvalid Credentials")
    }
})

app.post("/admin/courses",authenticateJwt, async (req,res) => {
    //logic for admin to create a course
    let credentials = req.user
    let admin = await Admin.findOne({username: credentials.username, password: credentials.password})
    if(admin)
    {
        let course = new Course(req.body)
        await course.save()
        /*
        after the code you provided, the course variable will have an _id field assigned by MongoDB by default. 
        When you create a new document using Mongoose and then call .save() to save it to the database, 
        MongoDB will generate a unique _id for the document if one is not explicitly provided in the req.body or set before calling .save()
        */
        res.status(200).send({"status": "Course added", "id": course.id})
        //you might notice that in database id key is represented as _id but here we are using just id don't worry it's fine mongoose is smart enough to figure it out
    }
    else
    {
        res.status(403).send("Unauthorized\nInvalid Credentials/token")
    }
})

app.put("/admin/courses/:courseId",authenticateJwt, async (req,res) =>{
    //logic for the admin to update a course by using id
    let credentials = req.user
    let admin = await Admin.findOne({username: credentials.username, password: credentials.password})
    if(admin)
    {
        let course = await Course.findByIdAndUpdate(req.params.courseId,req.body, { new: true })
        /*
        the first argument is id which is assigned by mongodb by default, second argument is the document which we want our existing document to be updated as
        the third argument is options
        As the name implies, findOneAndUpdate() finds the first document that matches a given filter , applies an update , and returns the document. 
        By default, findOneAndUpdate() returns the document as it was before update was applied. 
        You should set the new option to true to return the document after update was applied.
        */
        if(course)
        {
            res.status(200).send("Update successfull")
        }
        else
        {
            res.status(403).send("There is no course with id:- "+req.params.courseId)
        }
    }
    else
    {
        res.status(403).send("Unauthorized\nInvalid Credentials/token")
    }
})

app.get("/admin/courses",authenticateJwt, async (req,res) => {
    //logic for the admin to view all the courses
    let credentials = req.user
    let admin = await Admin.findOne({username: credentials.username, password: credentials.password})
    if(admin)
    {
        let courses = await Course.find({})
        /*
        Just like .findOne() .find() also does the same thing but the only difference is
        .findOne() gives you the first document which satisfies criteria entered
        but .find() gets you all the documents which satisfy the criteria
        */
        res.status(200).send(courses)
    }
    else
    {
        res.status(403).send("Unauthorized\nInvalid Credentials/token")
    }
})


//now let us define User routes

app.post("/user/signup", async (req,res)=> {
    //logic for the user to signup
    let credentials = req.body
    credentials.purchasedCourses = []
    let user = await User.findOne({username: credentials.username})
  if(user)
  {
    res.status(403).send("Username already registered")
  }
  else
  {
    let newuser = new User(credentials)
    await newuser.save()
   let token = generatetoken(req.body)
   res.status(200).send({"Status": "User registered", "token": token})
  }
})

app.post("/user/login", async (req,res) => {
    //logic for the user to login
    let credentials = req.body
    let user = await User.findOne({username: credentials.username, password: credentials.password})
    if(user)
    {
        let token = generatetoken(credentials)
        res.status(200).send({"Status": "User login successfull", "token": token})
    }
    else
    {
        res.status(403).send("Login failed\nInvalid Credentials")
    }
})

app.get("/user/courses",authenticateJwt, async (req,res) => {
    //logic for the user to view all the courses
    let credentials = req.user
    let user = await User.findOne({username: credentials.username, password: credentials.password})
    if(user)
    {
        let courses = await Course.find({})
        res.status(200).send(courses)
    }
    else
    {
        res.status(403).send("Login failed\nInvalid Credentials")
    }
})

app.post("/user/courses/:courseId",authenticateJwt, async (req,res) => {
    //logic for the user to purchase a course
    let credentials = req.user
    let user = await User.findOne({username: credentials.username, password: credentials.password})
    if(user)
    {
        let course = await Course.findById(req.params.courseId)
        //Here we are finding out which course has the id same as courseId in the params
        if(course)
        {
            user.purchasedCourses.push(course)
            /*
            Here you might think that we are pushing the whole document here
            which we don't wanna do because if any changes are made in the original courses
            collection then we won't have those changes made in an array which stored in purchasedCourses in a User document
            So we want to have reference of the original document of a particular course in Course collection
            so here mongoose is smart enough to know that User schema is in such a way that in purchasedCourses array
            the holds only the ObjectId's of documents that belong to Course collection (this is becuase we defined User schema in such a way check it at the top part of code)
            but if we perform console.log(course) then we would get the whole course, but while pushing it into the purchasedCourses array and saving user will result
            in purchasedCourses saving just the ObjectId which will be a reference to a document in Course collection
            */
           await user.save()
           res.status(200).send("Purchase successfull")
        }
        else
        {
            res.status(403).send("Course with id:- "+req.params.courseId+" not present")
        }
    }
    else
    {
        res.status(403).send("Login failed\nInvalid Credentials")
    }
})

app.get("/user/purchasedCourses",authenticateJwt, async (req,res) => {
    //logic for the user to view all the purchased courses
    let credentials = req.user
    let user = await User.findOne({username: credentials.username, password: credentials.password}).populate("purchasedCourses")
    /*
    Here we all know by now that user has an array purchasedCourses which just stores the id's of documents in Course collection
    by using the function .populate("purchasedCourses") we can have the documents present in Course collection with id's mentioned in purchasedCourses,
    instead of just the id's in the purchasedCourses array of user variable(once you run the code you will understand)
    if we don't use populate function then we would have just the id's in the purchasedCourses array in user variable
    but by using populate function purchasedCourses array of user variable will have the documents of those specific id's mentioned in the array previously
    */
   /*
   NOTE:- Please keep in mind that purchasedCourses array of user variable is getting populated not the original array in the database
   */
    if(user)
    {
        res.json({ purchasedCourses: user.purchasedCourses  });
    }
    else
    {
        res.status(403).send("Login failed\nInvalid Credentials")
    }
})