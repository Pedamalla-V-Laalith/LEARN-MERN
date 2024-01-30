import { createContext, useContext, useState } from 'react'
import { Button, Card, Typography } from '@mui/material'
import { RecoilRoot, atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Card style={{marginLeft: "auto", marginRight: "auto", width: "60vw"}}>
//         <Typography variant='h1' textAlign={'center'}><b>COUNTER GAME</b></Typography>
//         <Buttons count = {count} setCount = {setCount}></Buttons>
//         <Counter count = {count}></Counter>
//       </Card>
//     </>
//   )
// }

// function Counter(props)
// {
//   return (
//     <Typography variant='h4' textAlign={"center"}><b>{props.count}</b></Typography>
//   )
  
// }

// function Buttons(props)
// {
//   return (
//     <>
//     <div style={{
//       display: "flex",
//       justifyContent: "space-between",
//       width: "30vw",
//       margin: "0px auto"
//     }}>
//       <Decrease count = {props.count} setCount = {props.setCount}></Decrease>
//       <Increase count = {props.count} setCount = {props.setCount}></Increase>
//     </div>
//     </>
//   )
// }

// function Increase(props)
// {
//   return (
//     <Button variant='contained' onClick={()=>{
//       props.setCount(props.count + 1)
//     }}>Increase</Button>
//   )
// }

// function Decrease(props)
// {
//   return (
//     <Button variant='contained' onClick={()=>{
//       props.setCount(props.count - 1)
//     }}>Decrease</Button>
//   )
// }

/*
In this project/demo we will learn about state management using recoil and prop drilling.

prop drilling is a concept where we send the same props to child, grandchild, or even further children components
the same props from parent component.
This is known as prop drilling.
in our case count and setCount is being sent to Buttons component but it is not being used by Buttons component
but instead it is being used by it's children components which are Increase and Decrease

here we might notice that whenever we press the buttons in the DOM, virtually only Counter component is changing
but even though only Counter component is changing virtually, all the components including parent component, Buttons component
and it's other two components are getting rerendered because they are having count and setCount with them even though it doesn't 
change them. As we can clearly see that this is very inefficient. Only necessary components like Counter needs to be rerendered
This is where the concept of state management comes in.
*/
//First let us understand how to prevent prop drilling
//Now we will declare a global variable which is not restricted to the scope of some component

// const CountContext = createContext();

// function App() {
//   const [count, setCount] = useState(0)
//   //look at the opening tag of CountContext.Provider that's how we specify what variables or functions 
//   //need to undergo prop drilling without actually going to undergo prop drilling. look at the value property
//   return (
//     <>
//     <CountContext.Provider value={{
//       count: count,
//       setCount: setCount
//     }}>
//       <Card style={{marginLeft: "auto", marginRight: "auto", width: "60vw"}}>
//         <Typography variant='h1' textAlign={'center'}><b>COUNTER GAME</b></Typography>
//         <Buttons></Buttons>
//         <Counter></Counter>
//       </Card>
//     </CountContext.Provider>
//     </>
//   )
// }

// function Counter()
// {
//   //whichever components are wrapped in CountContext.Provider component can extract these values of count and setCount
//   //without prop drilling
//   const {count} = useContext(CountContext)
//   return (
//     <Typography variant='h4' textAlign={"center"}><b>{count}</b></Typography>
//   )
  
// }

// function Buttons(props)
// {
//   //here we are not extracting count and setCount because we don't need them in this component but they are needed in 
//   //the children components so we will extract them over there.
//   return (
//     <>
//     <div style={{
//       display: "flex",
//       justifyContent: "space-between",
//       width: "30vw",
//       margin: "0px auto"
//     }}>
//       <Decrease></Decrease>
//       <Increase></Increase>
//     </div>
//     </>
//   )
// }

// function Increase(props)
// {
//   //see we are extracting count and setCount here cause we need them here.
//   const {count, setCount} = useContext(CountContext)
//   return (
//     <Button variant='contained' onClick={()=>{
//       setCount(count + 1)
//     }}>Increase</Button>
//   )
// }

// function Decrease(props)
// {
//   const {count, setCount} = useContext(CountContext)
//   return (
//     <Button variant='contained' onClick={()=>{
//       setCount(count - 1)
//     }}>Decrease</Button>
//   )
// }

/*
Now let us understand how state management can be executed using recoil.
first we need to define/create an atom which needs to be global
*/

const countState = atom({
  key: "countState",
  default: 0
})

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <RecoilRoot>
      <Card style={{marginLeft: "auto", marginRight: "auto", width: "60vw"}}>
        <Typography variant='h1' textAlign={'center'}><b>COUNTER GAME</b></Typography>
        <Buttons></Buttons>
        <Counter></Counter>
      </Card>
    </RecoilRoot>
    </>
  )
}

function Counter()
{
  const count = useRecoilValue(countState)
  //Now here we are subscribing to the atom (i.e. a variable which is an atom). So now whenever the value of countState atom changes only
  //the Counter component will get re-rendered cause that's what we actually want
  //the current value of countState is stored in the variable count.
  return (
    <Typography variant='h4' textAlign={"center"}><b>{count}</b></Typography>
  )
  
}

function Buttons()
{
  return (
    <>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      width: "30vw",
      margin: "0px auto"
    }}>
      <Decrease></Decrease>
      <Increase></Increase>
    </div>
    </>
  )
}

function Increase()
{
  const setCount = useSetRecoilState(countState)
  //Here what we are doing is we are stating that in this component setCount will work as
  //state function for the atom countState. So you can actually change the value of countState using setCount
  //without the Increase component getting subscribed to countState atom, hence when countState value changes Increase component won't get rerendered.
  /*
  IMPORTANT NOTE:-
  Here you might actually get a doubt that:-
  since using countState atom in a component means subscribing to countState, then how can one might update the value of 
  countState using setCount without the access of countState value since we have to do something like (countState (+)or(-) 1)
  Now we will learn a new thing about state functions
  we all know that till now we sent values as arguments for state functions.
  But actually we can even send a function as an argument to the state functions.
  and the function which we sent will have it's first argument fixed with the current value of the 
  state variable with which the particular state function is associated
  And this function will return a certain value which will be updated as the new value of the state variable.
  */
  return (
    <Button variant='contained' onClick={()=>{
      setCount((current_value_of_countState)=>{
        return (current_value_of_countState + 1)
      })
    }}>Increase</Button>
  )
}
//Since we didn't use the countState atom in both the above and below components they won't get rerendered again when countState is updated
function Decrease()
{
  const setCount = useSetRecoilState(countState)
  return (
    <Button variant='contained' onClick={()=>{
      setCount((current_value_of_countState)=>{
        return (current_value_of_countState - 1)
      })
    }}>Decrease</Button>
  )
}

export default App