import {useState} from "react"
/*
Here you are importing {useState}
but you can also import React
and then use the useState like this whenever needed:- React.useState(...)
*/
import './App.css'

function App() {
  //How the control actually reaches here, that we will learn later on in later projects (Hint:- it actually has something to do with main.jsx)but
  //for now let's focus on how to create state variables
  //let's first understand what is a state variable:-
  /*
  for example if we have a variable which has some data stored in it
  and we are returning that data in appropriate format of html to the user.
  now suppose  we made some changes in this variable, But even then we wouldn't
  see those changes in the DOM
  in order for these changes to be consistent in the DOM we need to make these
  variables as state variables.
  and the way to define a state variable is:-
  you gotta make sure that it contains 2 main things:-
  1. State
  2. Component
  and also first to create state variables import useState from react
  component is basically the data and state is how we want that particular data to be rendered in the frontend.
  */
  const [a, set_a] = useState({
    title: "variable a",
    description: "this is content inside variable a",
    timer: 0
  })
  /*
  Now this is how you define a state variable
  now if you experiment with this a little bit you would know that
  if you write a function like this:-
  setInterval(() => {
    a.timer = a.timer+1; //incrementing by 1 each time we call this function
  },1000)
  then you might notice that the value is being changed here but the changes
  are not visible in DOM
  the DOM is not getting updated
  This is because whenever we update the state variable or make any changes in the 
  variable we need to do it using the function which is available to us
  in this case we named the function as set_a
  so basically we need pass this new updated variable as an argument to this set_a function
  */
//  setInterval(() => {
//   set_a({
//     title: "variable a\n",
//     description: "this is content inside variable a",
//     timer: a.timer+1 
//   })
//  },1000)
 //now you can see that this is being updated
 /*
 You might have noticed something when the code is as it is like above
 in the DOM we intend to change timer once every second right but you
 might have noticed that after one second the timer is being updated faster than one second
 this is happening because whenever we change the contents of state variable 
 (in this case using set_a) the component App() gets called again once more whenever we change the 
 state of a state variable.
 so in this particular code what's happening is whenever the set_a is being called App() is
 being called again resulting in multiple setInterval functions being called side by side
 which then results in App() getting called even more and more. at this point the changes will happen
 logarithmically (i.e. it will go very quick exponentially)
 in order to fix it you can do something like this:-
 let i = 0
 if(i == 0)
 {
  setInterval(() => {
   set_a({
     title: "variable a\n",
     description: "this is content inside variable a",
     timer: a.timer+1 
   })
  },1000)
  i++
 }
 */
 /*
 try this on your own where the contents inside return looks like this:-
 return (
    <>
      <h1>Hello world</h1>
      {a.title}
      {a.description}
      {a.timer}
    </>
  )
  Do this and you will understand better
 */
// set_a({
//   title: "variable a",
//   description: "this is content inside variable a",
//   timer: 1
// })
/*
try out the above code and check what exactly is happening
if you check the console then it would show too many rerenders
that is because we learned above that calling function like set_a which changes the state of state variable
calls the rerenders(in simple terms) calls the App() once again
when this is called the commands where the state variables are being defined are not called again
because we are using useState over there which sort of prevents that from happening
but the part where we are calling functions like set_a will get executed again and again which sort of re-renders
the state variable multiple times causing in the error too many re-renders
*/
  return (
    <>
      <h1>Hello world</h1>
      <div>{a.title}</div>
      <span>{a.description} </span>
      {a.timer}
      <PersonName></PersonName>
      <FullName firstname="V Laalith" lastname="Pedamalla"></FullName>
    </>
  )
}
/*
Now the function App() is a component
every react component looks like the same
like i mean there will be some javascript code inside and it will return 
some html
*/
/*
Now let us understand components even better by creating another component
*/
//And oh one more important thing while defining the components make sure that their first letter is always capital.
function PersonName()
{
  //now till now we just defined this function not yet used it so let's dive deeper

  return(
    <>
      <div>
      <h1>Laalith</h1>
      </div>
    </>
  )
  //now we are returning this particular html now let's see how to use this component
  //in order to use this we need to use the tags <PersonName></PersonName>
  //in html component inside the return block in App() component
}
/*
Now let us understand that these components can accept something known as props
now let's define another component and use it in App() to see how the props work
*/
function FullName(props)
{
  return (
    <div>
      {props.firstname} {props.lastname}
    </div>
  )
}
/*
This is how you use props in components and check out App() to see how we
passed props as attributes to the FullName tag
while we are passing the values for the attributes in App() note that we
can even give the attributes values of some variables.
*/
export default App