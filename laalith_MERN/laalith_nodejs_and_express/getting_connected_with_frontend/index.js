//for complete details of this code's problem statement visit index2.js file
//This is an updated version of that code which enables us to store data in files
//in order for this code to work make sure that there is a file todos.json
//which will act as a file which stores an array of objects
//and also initialize the todos.json as an empty array if you want to have a fresh start
const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const port = 3000;
const app = express();
var rid = 0;


app.listen(port,() => {
    console.log(`example app listening at port ${port}`);
})

app.use(bodyparser.json())
app.use(cors())

app.get("/todos", (req,res) => {
    fs.readFile("todos.json","utf-8", (err,data) => {
        if(err)
        {
            console.error(err);
            res.status(500).send("an error from the backend")
        }
        else
        {
            res.status(200).send(JSON.parse(data))
            /*here in the above code
            parse() JSON parsing is the process of converting a JSON object 
            in text format to a Javascript object that can be used inside a 
            program.
            when the data is read from file it will be in text format when it
            is perceived by the code so here the parse function is converting 
            that data into a valid javascript object
            */
        }
    })
})

app.post("/todos", (req,res) => {
    fs.readFile("todos.json","utf-8", (err,data) => {
        if(err)
        {
            console.error(err);
            res.status(500).send("an error from the backend")
        }
        else
        {
            let a = req.body
            let todo = JSON.parse(data)
            //here we are storing all the json file data as a javascript array consisting objects
            let i = (todo.length) - 1
            if(i == -1)
            {
                a.id = 0
                rid = 0
            }
            else
            {
                a.id = todo[i].id + 1
                rid = a.id
            }
            todo.push(a)
            //adding the new todo task to the existing task list
            //and now writing these new changes into the todos.json file
            fs.writeFile("todos.json",JSON.stringify(todo),"utf-8", (err) => {
                /*here in the above code
                stringify() method in Javascript is used to create a JSON string out of it.
                While developing an application using JavaScript, many times it is needed 
                to serialize the data to strings for storing the data, 
                The data has to be in the form of strings.
                */
                if(err)
                {
                    console.error(err);
                    res.status(500).send("an error from the backend")
                }
            })
            res.status(201).send("your todo task added to the todo list with id:- " + rid)
        }
    })
})

app.delete("/todos/:id", (req,res) => {
    fs.readFile("todos.json","utf-8", (err,data) => {
        if(err)
        {
            console.error(err);
            res.status(500).send("an error from the backend")
        }
        else
        {
            let flag = -1
            let todos = JSON.parse(data)
            for(let i = 0; i<todos.length;i++)
            {
                if(todos[i].id == parseInt(req.params.id))
                {
                    flag = i
                }
            }
            if(flag == -1)
            {
                res.status(404).send("There is no todo task with id:- "+parseInt(req.params.id))
            }
            else
            {
                for(let i = flag;i<(todos.length)-1;i++)
                {
                    todos[i] = todos[i+1]
                }
                todos.splice((todos.length - 1),1)
                //the above command removes 1 element starting from the index todos.length-1 which is the last element
                //todos[flag] = {}
                    fs.writeFile("todos.json",JSON.stringify(todos),"utf-8", (err) => {
                        if(err)
                        {
                            console.error(err);
                            res.status(500).send("an error from the backend")
                        }
                        else
                        {
                            res.status(200).send("Deletion successfull")
                        }
                    })
            }
        }
    })
})

app.put("/todos/:id", (req,res) => {
    fs.readFile("todos.json","utf-8", (err,data) => {
        if(err)
        {
            console.error(err);
            res.status(500).send("an error from the backend")
        }
        else
        {
            let flag = -1
            let todos = JSON.parse(data)
            let a = req.body
            for(let i = 0; i<todos.length;i++)
            {
                if(todos[i].id == parseInt(req.params.id))
                {
                    flag = i
                    a.id = parseInt(req.params.id)
                }
            }
            if(flag == -1)
            {
                res.status(404).send("There is no todo task with id:- "+parseInt(req.params.id))
            }
            else
            {
                todos[flag] = a
                    fs.writeFile("todos.json",JSON.stringify(todos),"utf-8", (err) => {
                        if(err)
                        {
                            console.error(err);
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
})

app.get("/todos/:id", (req,res) => {
    fs.readFile("todos.json","utf-8", (err,data) => {
        if(err)
        {
            console.error(err);
            res.status(500).send("an error from the backend")
        }
        else
        {
            let flag = -1
            let todos = JSON.parse(data)
            for(let i = 0; i<todos.length;i++)
            {
                if(todos[i].id == parseInt(req.params.id))
                {
                    flag = i
                }
            }
            if(flag == -1)
            {
            res.status(404).send("There is no todo task with id:- "+parseInt(req.params.id))
            }
            else
            {
                res.status(200).send(todos[flag])
            }
        }
    })
})


function defaul(req,res)
{
    res.status(404).send("Page not found")
}
app.get("/:example", defaul)
app.post("/:example", defaul)
app.put("/:example", defaul)
app.delete("/:example", defaul)


/*
Here we are working with frontend with the help of index.html
when we are working with it you may notice that index.html is completely unrelated to index.js till now and 
trying to interact with the backend of index.js, this might result us in having a CORS error
CORS errors happen when a webpage makes a request to a different domain than the one that served the page, 
and the server responds with an HTTP error because the “Origin” header in the request is not allowed by the 
server's CORS configuration.
one way to solve this:-
In order to fix this issue make sure that your frontend is being served from the same URL
that your sending backend responses to.
now let's see how we can do that:-
*/
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})
/*
when the user accesses the url http://localhost:3000/ from the same port which is 3000
then the preview will be that of index.html file
*/
/*
The other way to solve this is by installing cors and importing cors into this
index.js file and using cors middleware
basically what this does is it will allow any website access index.js without
any restrictions and without any cors errors
(but this method of allowing everything to access the code is very risky and unsecure)
*/