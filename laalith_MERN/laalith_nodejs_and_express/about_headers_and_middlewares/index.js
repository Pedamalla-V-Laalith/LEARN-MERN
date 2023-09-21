const express = require("express");
const app = express();
const port = 3000;

function sum(n)
{
    let ans = 0;
    for(let i=0;i<n;i++)
    {
        ans += i;
    }
    return ans;
}


/*
Now let us learn about middlewares
we know that whenever user send a get request then the control gets to app.get handler with the appropriate route
but what middlewares do is, before the control gets to app.get it gets to the middleware where a particular function
will be performed
now let's see how exactly it works
*/
// Middleware functions take three arguments req res next
var numberofrequests = 0
function middlewar1(req,res,next)
{
    let z = req.headers.counter
    console.log("this is from middleware counter:- "+z);
    
    numberofrequests += 1
    //the above two lines basically tells us how many times this middleware is being called
    // or basically how many times the request handlers below this middleware are being called
    console.log("number of requests till now are:- "+numberofrequests)
    next();
}
//here in the above function when the control gets to the above middleware function
//it will print a header key named as counter which belongs to a specific route
//now when the control reaches next() then the control gets to app.get or whatever it may be
app.use(middlewar1)
//here we are registring this middleware, what we are doing is we have told express that every request handler below this has to go after this middleware
//here the middleware middlewar1 is getting used before the request method gets handled




/*
we already know about query params and how to work with them 
now let us find out how to work with headers
*/
app.post("/",(req,res) => {
    let a = req.headers.counter
    var b = "the sum is:- " + sum(a)
    res.send(b)
    //if you want to see all the headers then you can simply log them in the console
    //all of them will be printed when the url is entered
    console.log(req.headers)
})
/*
Here we have a post request method handler which handles the url 
http://localhost:3000/ which can only be accessed by post method *for now*
so since we can't directly do it with the browser becoz browser only handles
get request methods by default we will use postman application
now go to postman application and paste this url along with selecting post request method
now go to the headers section and create a new key in header named as counter, also give a value
to that key after creating it.(we gave the name counter to the key in this case but we can give any name to it)
if we do all this then we will observe that the code is working as expected and giving us desirable outcome
*/
/*
NOTE:- there is no easy way for you to send headers in the browser
and also there is no easy way for you to send a post request in browser
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })