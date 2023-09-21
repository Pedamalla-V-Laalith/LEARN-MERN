/*
till now we learnt about params and headers now let us learn about the third
way of giving an input, this way will be through body
unlike params and headers you can't directly access body elements because there
are different types of bodies like json, javascript, Text, HTML, XML
so in express framework in order to use elements of body we can't just use 
req.body..... because it will give you undefined and there is a solution for this which we can do through an external library
known as body-parser
*/
const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;


app.use(bodyparser.json())
/*
here in the bodyparser library we have different middlewares to get data from the body
and in our present case we are using postman application and created a body in the application
which is in json format and the contents of it are as follows:-
{
    "name": "laalith",
    "age": 19,
    "counter": 100
}
(note:- yes this kind of looks like objects in javascript)
so the above command app.use(bodyparser.json()) is a command which invokes
the middleware (which is in-built and resides in bodyparser library) bodyparser.json()
will help us get the data from the body
*/
function handlesum(req,res)
{
    let n = req.body.counter
    console.log(req.body)
    /*
    usually the above two statements will give you undefined but since we 
    used the bodyparser.json() middleware above the app.post, now we can access the contents of body
    */
    let sum =0;
    for(let i =0;i<n;i++)
    {
        sum += i;
    }
    res.send("the sum is:- "+sum)
}
app.post("/",handlesum)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/*
now till now we learnt about different types of requests now let us learn about
different types of responses
https webpages can respond in 3 parts:-
An HTTP response contains:
A status line.(STATUS CODE)
A message body, which is usually needed.(BODY)
A series of HTTP headers, or header fields.(HEADERS)
https response status codes range from 100-599
informational responses (100-199)
Successful responses (200-299)
Redirection messages (300-399)
client-error responses (400-499) eg. 404 not found
Server error responses (500-599)
now let us see this in action
*/
app.post("/s",(req,res) => {
    let n = req.body.counter
    console.log(req.body)
    if(n<100000)
    {
        let sum =0;
    for(let i =0;i<n;i++)
    {
        sum += i;
    }
    res.send("the sum is:- "+sum)
    }
    else
    {
        res.status(411).send("you have entered a number which is greater than 1 lakh")
        /*
        In Node.js, the code above is an example of method chaining. 
        Method chaining is a programming pattern where multiple methods are called on the same object in sequence,
        with each method returning the object itself (or an object of the same type), 
        allowing you to chain further methods onto it.
        */
    }
})
/*
In the above code what we are doing is we are basically restricting the user
to give a value which is less than 100000
basically when the code works fine then the status code will be 200 which is ok
by default when the code works fine the status code will 200 itself
although you can manually add it too like this:-
res.status(200).send(blahblah)
*/
/*
Now since we learned about status codes now let us learn about body and how
response sends body
Response body is of different type some of them are :-
HTML
JSON
Simple text
Till now we always returned simple text to the user
now we will how to return in the form of JSON
*/
app.post("/b", (req,res) => {
    let n = req.body.counter
    console.log(req.body)
    let sum = 0;
    let ans = 1;
    for(let i =0;i<n;i++)
    {
        sum += i;
    }
    for(let i =1;i<n;i++)
    {
        ans = ans * i;
    }
    var a = {
        calculatedsum: sum,
        calculatedmul: ans,
    }
    res.send(a)
    /*
    oh by the way you can also write res.json(a) instead of res.send both will
    do the same thing since a is an object
    but res.json("fbvjdsh") won't work since the argument in json function is a string
    and it is capable of only taking javascript objects
    */
})
//here as you can see we are sending an object which the user will recieve in the form of 
//JSON(javascript object notation) body


//Now we will learn how to return a html page to the user
app.get("/ht", (req,res) => {
    res.send(`<head>
    <title>
        Hello from page
    </title>
</head>
<body>
    <b>hi there</b>
    <p>how are you</p>
    <i>I am Laalith</i>
</body>`)
//here we are using these wierd looking quotes `` and inside it we can write a multiline string
//here we are pasting the html code from index.html
})
//now this is how we are going to response in the form of html to user
//now let us see how can we send a html file directly
app.get("/htf", (req,res) => {
    res.sendFile(__dirname+"/index.html")
    //here __dirname returns the path to the current directory
})


/*
till now we learnt that browsers/applications like postman can talk to 
http servers/Nodejs processes now we will learn that even a nodejs process
can talk to other http servers/Nodejs
now let us see how it happens
create a new file named as second.js
go to that file in this same directory to check out more
*/
//this below request handler is used for convinience
app.get("/q", (req,res) => {
    let x = req.query.x
    let a = {
        number: x,
    }
    res.send(a)
})
/*
if you did check the second.js file by now you should probably understand that 
fetch function can also send requests just like browsers and applications like postman
*/