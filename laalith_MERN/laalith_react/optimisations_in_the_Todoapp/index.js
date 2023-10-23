const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const port = 3000;
const app = express();
var rid = 0;


app.listen(port,() => {
    console.log(`example app listening at port ${port}`);
})

app.use(express.json())
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
            fs.writeFile("todos.json",JSON.stringify(todo),"utf-8", (err) => {
                if(err)
                {
                    console.error(err);
                    res.status(500).send("an error from the backend")
                }
            })
            res.status(201).send({message: "your todo task added to the todo list with id:- " + rid, id: rid})
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



app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})
