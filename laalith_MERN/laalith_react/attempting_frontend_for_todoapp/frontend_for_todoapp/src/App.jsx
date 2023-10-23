import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function useTodos()
{
  //note that all hooks including custom hooks will start with use in the name
  const [todos,setTodos] = useState([])
  useEffect(()=>{
    let obj = {
      method :"GET"
    }
    fetch("http://localhost:3000/todos",obj).then((response_object)=>{
      response_object.json().then((data)=>{
        setTodos(data)
      })
    })
    /*
    And if you want your web page to work in real time which means everytime
    you add something new to the todos after one second the todo list should
    get updated then you can use the setInterval function like below
    now you might get two doubts
    1. isn't fetching response from a route expensive
    2. doesn't this mean the whole DOM gets rerendered everytime when a value
      gets added
    explanation:-
    1. yes it is expensive we will get to better ways of doing this
    2. In order to understand this let us first understand how react works:-
      basically whenever a state variable is updated the whole component doesn't get rerendered
      react framework is really smart enough to figure out that it should compare
      previous virtual DOM and new virtual DOM and make changes only in that part of the DOM where changes are required
      in our code in the defnition of our custom hook, when we make changes to the state variable
      the whole useTodos function/(in this case custom hook) gets executed again
      and since we are using useState and useEffect hooks they won't get executed again and again 
      but will get executed only for the first time 
      and since we have setInterval command it will keep on running and updating the state variable
      but the command return todos will get executed each time setTodos is executed
      resulting in returning the new values everytime.
    */
    setInterval(()=>{
      let obj = {
        method :"GET"
      }
      fetch("http://localhost:3000/todos",obj).then((response_object)=>{
        response_object.json().then((data)=>{
          setTodos(data)
        })
      })
    },1000)
  },[])
  return todos
}
function App() {
  // const [todos,setTodos] = useState([])
  //above we are creating a simple state variable which is capable of representing
  //all our existing todos
  //below we are using useEffect because we want to hit the /todos route only
  //once
  //so that this inside function is going to get executed only when the page is refreshed
  //but does not get executed everytime the page gets rerendered that means App() getting called again and again
  // useEffect(()=>{
  //   let obj = {
  //     method :"GET"
  //   }
  //   fetch("http://localhost:3000/todos",obj).then((response_object)=>{
  //     response_object.json().then((data)=>{
  //       setTodos(data)
  //     })
  //   })
  // },[])
  /*
  Now in the above code (which is now commented) useEffect in-built hook is used
  but sometimes writing this whole logic can be tedious
  that is why we can actually design our own hooks which are also known as custom hooks
  we can define custom hooks just like functions.
  */
  //now instead of all these lines we can just write one line
  const todos = useTodos()
  //now todos will also be a state variable in App() since it will have a value
  //of a state variable which is returned by useTodos
  //and whenever todos gets updated the App() component will get rerendered appropriately
  //now useTodos will also act like a hook
  return (
    <>
      <div>
        {
          todos.map((todo) => {
            return (
              <RenderTodo id={todo.id} title={todo.title} description={todo.description}></RenderTodo>
            )
          })
        }
      </div>
    </>
  )
}

//below we are trying to design a component which takes care of rendering
//a single todo element
//it will render it's id,title,description,it has it's own update button 
//and delete button
function RenderTodo(props)
{
  return(
    <>
    id:- {props.id}
    <br></br>
    title:- {props.title}
    <br></br>
    description:- {props.description}
    <br></br>
    <button>Update</button>
    <button>Delete</button>
    <br></br><br></br>
    </>
  )
}
export default App
/*
for now we will only write this much code 
further in our journey maybe we will try to create a fully functional good looking
todo app.
*/