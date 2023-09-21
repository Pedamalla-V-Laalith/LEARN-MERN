/*Now just like fs package which is used for filemanagment
we have a lot of other packages as well such as npm
which stands for NODE PACKAGE MANAGER now unlike fs package 
which is already included in the node, we have to import the npm package 
into our code.*/
/* Now we need to work with anew library called Express. this library is 
is the one which is useful to work with http servers*/
const express = require("express");
/*now if we run this code like it will show us an error becausse the 
machine couldn't find express module. So what we need to is we need to
run a command in the terminal 
npm install express
this command will allow us to access express module*/
const app = express()
const port = 3000
function sum(n)
{
    var a = 0;
    for(var i=0;i<n;i++)
    {
        a += i;
    }
    return a;
}
app.get('/', (req, res) => { 
  var ans = "the sum is:- "+sum(100)
  res.send(ans)
})
/*Here in the above code what we are basically doing is, whenever a request 
is recieved at route '/' then the function in the argument gets executed
in order to that route you have to type http://localhost:3000/ in your browser
In that page we are printing sum of first 100 whole numbers*/
/*Here we can see that there is a complicated code looking like this:-
app.get('/', (req, res) => {
  res.send(sum(100))
})
here basically what we are doing is we are defining a function in the 
argument section of get function
if we do it like this:-
function example(req,res)
{
    res.send(sum(100))
}
app.get('/',example)
then this above code will be performing same function as before.*/

app.get('/thousand', (req, res) => { 
  var ans = "the sum is:- "+sum(1000)
  res.send(ans)
})
/*here the route is '/thousand' so in order to get the above result 
we need to type http://localhost:300/thousand 
if we type http://localhost:3000 and then give some other route then we will get
some other result like in the case of '/' route or if we don't specify
any action to a specific route it will display cannot get the route we mentioned
for example if we type http://localhost:3000/bgfn this in the browser
then it will display:- Cannot GET /bgfn*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/*the above command is creating a web page at port number 3000 and makes sure that the http web page is always running 
continuosly at port 3000 which is mentioned. It makes sure your process 
runs indefinitely and infinitely. While running continuosly it also waits 
for incoming requests from the client.*/


/*now let us find out how can user give an input and how can we work with
that input */
app.get('/inputofuser', (req, res) => { 
  var i = req.query.counter;//here we are getting the value which user gave for counter query param
  var ans = "the sum is:- "+sum(i)
  res.send(ans)
})
/* the method which we used above is know as Query params*/
/*well just like in the above codes we can write either:-
http://localhost:300/thousand or
http://localhost:300/
these codes give us predetermined outcome for those particular routes
but if we type in http://localhost:300/inputofuser?counter=10
then the value of counter will be 10.
here the name of counter can be anything 
if we have a code like this:-
app.get('/inputofuser', (req, res) => { 
  var i = req.query.a;
  var ans = "the sum is:- "+sum(i)
  res.send(ans)
})
then in the browser we need to type like this 
http://localhost:300/inputofuser?a=10
if we can send in multiple values then we can write it like this:-
http://localhost:300/inputofuser?counter=10&counter2=234&counter3=87524
i hope you understand this concept
*/


/*
In every http server web applications there are four main methods:-
1. GET
2. POST
3. PUT
4. DELETE
there are also many other request methods but the above four are the main ones
GET requests are basically the requests where data from the backend is given 
to the user.  when you type in the url in a browser the browser by default 
takes it as a GET request because when a user types in something in browser
it is expected that some data should be shown to the user like a web page for example.

POST requests are basically those requests where a user gives some data for the
backend machines to store.

PUT requests are basically those requests where the user wants the backend machines
to update some specified value to some other value.

DELETE requests are basically those requests where the user wants the backend machines
to delete a specified value.

*/
/*
Let us see how can we perform post requests
*/
app.post("/postreq",(req,res)=>{
  res.send("hello this is a post request route")
})
/*ideally if you type this route in your browser you will get connot get
beacuse the default nature of the browser is to handle get requests when you
type in a url
but if you check the url in the postman app and select post method in the options 
you can see that it is working*/


/* same thing goes for put and delete request methods*/
app.put("/putreq",(req,res)=>{
  res.send("hello this is a put request route")
})
app.delete("/deletereq",(req,res)=>{
  res.send("hello this is a delete request route")
})



/*
Now we know that a random route will give us cannot get route error
but we can write a specific code which can handle any route 
*/
app.get("/:example",(req,res)=>{
  var z = req.params.example
  res.send("hello this is a default web page for route :- "+z)
})
/*
this above code will literally handle any route even if the route is like this
/jhbgfrehjrgfeb it doesn't matter it will still handle it 
becuase in the above code which has colon(:) after forward slash(/) it will
act as a wildcard which will accept any route
*/
/*
here you also might notice that there is a new command which we used
req.params.example
since our code has an argument like this "/:example" which acts as a wildcard
the command req.params.example returns whatever route the user enters which is not already handled
and stores it in the variable z as you can see above 
*/