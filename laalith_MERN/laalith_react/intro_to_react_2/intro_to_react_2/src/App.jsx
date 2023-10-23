import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {

/*
Now the format which we are going to follow to learn is we might do something which
is not that useful to this project but still is very helpful to dig deeper into the
concepts of react. The "not-so-useful" snippets of code will be commented out
so please bear with me and try to understand what actually is going on in the code
by following the comments.
*/
/*
Now in the backend code when we want the list of all todos we get an array which
consists of objects which represents todos
so now when we need to show this array to the user via frontend/DOM
we need to render an array, hence we need to create a state variable which
stores an array (we are using a state variable because changes might occur in the array and they need to be rendered)
note:- we are going to use map functions with array it's quite easy topic in javascript pls study that and comeback
*/
const [exampletodos,exampleSetTodos] = useState([
  {
    title: "go to gym",
    description: "go to gym from 5-6",
    id: 1
  },
  {
    title: "breakfast",
    description: "have upma as your breakfast today",
    id: 2
  }
])
//this is how we create a state variable which stores an array for now the array
//has only two objects inside it later on we can change this by using exampleSetTodos
//exampleSetTodos([])
//for example here we are setting the state variable as an empty array
//but never call the exampleSetTodos() like this as we already leanrt in previous
//codes (in file intro_to_react) that executing exampleSetTodos() like this will
//lead to a "too many rerenders error"
/*
Now one way to tackle this problem is by initiating a variable which acts as
a counter outside the App() and solving the problem by using if-else statements
as we saw in previous code
but now we will learn a new method.
*/
/*
Now let us get introduced to a concept called hooks.
Hooks are functions that let you “hook into” React state 
and lifecycle features from function components.
What this means is, in the above code where we are initialising exampletodos
we used a hook that is useState/React.useState which basically prevented 
from the initialising command to get executed again during re-rendering
hooks kind of protect state variables from getting rendered again.
hooks will let functions like exampleSetTodos() make changes to the state variables
only once and not more than that no matter how many re-renders happen
(that is no matter how many times App() gets called)
*/
/*
Just like useState there is another hook known as useEffect
useEffect is a built-in hook in React that allows you to perform 
side effects in functional components. Side effects can include data 
fetching, manually changing the DOM, subscribing to a data source, 
and more. It's an essential part of React's component lifecycle 
management in functional components.
Here's an explanation of useEffect and how it works:
Syntax and Usage:
useEffect takes two arguments: a function and an array of dependencies (optional). The function you pass as the first argument is called the "effect" function.

The effect function is executed after the component renders.
If you provide an empty dependency array ([]) as the second argument, the effect will run only once, after the initial render.
If you omit(not include) the dependency array, the effect runs after every render.//which we are trying to avoid with state functions
If you provide dependencies, the effect runs whenever any of the dependencies change

Example with No Dependencies:
useEffect(() => {
  // This code will run after every render
  console.log('Component rendered');
});

Example with Empty Dependency Array:
useEffect(() => {
  // This code will run once after the initial render
  console.log('Component mounted');
}, []);

Example with Dependencies:
const [count, setCount] = useState(0);

useEffect(() => {
  // This code will run whenever 'count' changes
  console.log('Count changed:', count);
}, [count]);

*/
  return (
    <>
      <div>
      {/* <div>
        {JSON.stringify(exampletodos)}
        {
          Note:- In React whenever you are rendering and you wanna use
          javascript inside the return react(i.e. the block which we are in)
          (the block which is used for rendering) we need to use curly braces
          to write snippets of javascript code inside it.
          and also React doesn't know how to render a json so we need to use
          stringify method.
          in this block we are using curly braces to use comments.
        }
      </div> */}
      {
        /*
        Above we saw how to show all the elements without having any of them
        rendered now let's learn how to render each and every element of
        exampletodos array
        note:- this will get a little confusing but try to understand.
        */
      //  exampletodos.map((todo)=> {
      //   return <div>
      //     {todo.title}
      //     <br></br>
      //     {todo.description}
      //     <br></br><br></br>
      //   </div>
      //  })
       /*
       here what we are doing is we know that .map returns an array of length
       same as the array on which it is called upon
       and now inside the function inside map we are returning a html
       now this inside function is being called for every element in exampletodos (say n elements)
       so the map will return n html snippets which will be returned by App
       which then will be visible in the DOM for the user to see.
       */

       //instead of doing the above thing you can also create a new component
       //and use it
      exampletodos.map((todo)=> {
        return(
          <Todo title = {todo.title} description = {todo.description}></Todo>
        )
       })
      }

      </div>
    </>
  )
}

function Todo(props)
{
  return <div>
    {props.title}
    <br></br>
    {props.description}
    <br></br><br></br>
    </div>
}
export default App
