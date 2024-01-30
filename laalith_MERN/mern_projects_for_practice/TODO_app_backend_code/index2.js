//in order for this code to work make sure that there is a file todos.json
//which will act as a file which stores an array of objects
//and also initialize the todos.json as an empty array if you want to have a fresh start
const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const port = 3000;
const app = express();
var rid = 0;


app.listen(port,() => {
    console.log(`example app listening at port ${port}`);
})

app.use(bodyparser.json())

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
            a.id = rid++
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
            res.status(201).send("your todo task added to the todo list with id:- " + (rid-1))
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
                todos[flag] = {}
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