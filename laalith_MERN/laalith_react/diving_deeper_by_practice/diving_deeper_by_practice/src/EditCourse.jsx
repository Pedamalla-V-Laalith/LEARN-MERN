/*
PLEASE NOTE:-
DISCLAIMER:-
BEFORE LEARNING THE CODE AND CONTENT IN THIS FILE IN ORDER TO FULLY UNDERSTAND 
PLEASE VISIT THE FILE OgEditCourse.jsx
THIS FILE IS AN UPDATED VERSION OF THAT FILE
THIS FILE TEACHES ABOUT STATE MANAGEMENT.
*/
//In order to see this file in action replace CleanEditCourse in App.jsx with EditCourse
import { Button, Card, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { atom, useRecoilState } from "recoil"

const courseState = atom({
    key: "courseState", // unique ID (with respect to other atoms/selectors) usually the atom name itself.
    default: '',
})

function EditCourse()
{
    /*
    Let us learn about what is state management
    we already know that whenever a state variable of a particular component gets changed
    then that component gets re-rendered
    */
   /*
   In React, when the state of a parent component changes and it triggers a re-render of the parent component, 
   it will also cause any child components within the parent to re-render, but not necessarily every child component. 
   React's reconciliation algorithm aims to minimize the number of re-renders by efficiently updating the virtual DOM 
   and only re-rendering components that are affected by the state change. If a child component's props or state depend 
   on the parent's state that has changed, then that specific child component will re-render. However, 
   React does not re-render components that are not affected by the state change.

   So, in summary:

   1. When the state of a parent component changes, React will schedule a re-render of the parent component.

   2. During the re-render of the parent component, React will also check if any child components rely on 
   the updated state or props. If they do, those specific child components will re-render.

   3. Child components that are not dependent on the state change in the parent will not re-render, 
   as React optimizes the re-rendering process.

   This behavior is part of what makes React efficient and allows for better performance in applications. 
   It ensures that only the necessary parts of the UI are updated when state changes occur.
   */
  /*
  In our case we have, in this file We have three components:- 2 child components(EditCard & CourseCard), 
                                                               1 parent component(EditCourse)
  We know that in EditCard component when we press the button "Edit" virtually only the CourseCard gets re-rendered
  But in reality all three components gets rerendered you can see this because of console.log commands in every component
  but the only difference is react is smart enough to know what are the necessary changes need to be made in the DOM. 
  But it's not that smart enough to know, which components it should not rerender if they are dependent on certain state 
  variables but not getting affected by the state change.
  This is where state management takes care of things

  And there are multiple state management libraries such as Redux, Recoil, Zustand, etc.
  
  */
 //first install recoil by running npm install recoil
 //And then make the required changes in App.jsx by adding <RecoilRoot>

 /*
Now let's learn about atom:-
An atom represents a piece of state (just like a state variable but not exactly). 
Atoms can be read from and written to from any component. 
Components that read the value of an atom are implicitly subscribed to that atom, 
so any atom updates will result in a re-render of all components subscribed(any component that uses the variable which is an atom) 
to that atom
 */
/*
To write the code for an atom check out the starting of this file.
*/
/*
Guys i am sorry i didn't yet understand recoil's working well so i can't really code well right now
just visit understanding_state_management folder to understand recoil.(visit that folder once you are done with this.)
Thank you
*/
    console.log("hi from EditCourse")
    let { title } = useParams()
    const [courseDetails, setDetails] = useState({})
    const [changing, setChanging] = useState(false)
    const [newdescription, setnewDescription] = useState("")
    const [newprice,setnewPrice] = useState("")
   useEffect(()=>{
    let obj = {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer "+ localStorage.getItem("token")
        }
    }
    fetch("http://localhost:3000/admin/courses/"+title,obj).then((response_object)=>{
        if(response_object.headers.get('Content-Type').includes('text/plain'))
        {
            response_object.text().then((data)=>{
                window.alert(data)
            })
        }
        else if(response_object.headers.get('Content-Type').includes('application/json'))
        {
            response_object.json().then((data)=>{
                setDetails({
                    "title": title,
                    "description": data.description,
                    "price": data.price
                })
            })
        }
    })
}, [changing])

    return (
        <>
        <CourseCard course = {courseDetails}></CourseCard>
        <EditCard setnewDescription = {setnewDescription} setnewPrice = {setnewPrice} setChanging = {setChanging}
                  title = {title} newdescription = {newdescription} newprice = {newprice} changing = {changing}>  </EditCard>
        </>
    )
}

function CourseCard(props)
{
    console.log("hi from CourseCard")
    return (
        <>
        <Card style={{marginLeft: "auto", marginRight: "auto", padding:"10px", width:"300px", minHeight:"200px"}}>
            <Typography variant="h6" textAlign={"center"}>{props.course.title}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{props.course.description}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{props.course.price}</Typography>
        </Card>
        <br></br><br></br>
        </>
    )
}

function EditCard(props)
{
    console.log("hi from EditCard")
    return(
        <>
        <h4 style={{textAlign: "center"}}><b>Please enter new details for the course:- {props.title}</b></h4>
        <Card style={{marginLeft: "auto", marginRight: "auto", padding:"10px", width:"300px", minHeight:"200px"}}>
        <TextField label="newDescription" variant="outlined" size="small" fullWidth={true}
                onChange={(e)=>
                {
                    props.setnewDescription(e.target.value)
                }}/>
        <TextField label="newPrice" variant="outlined" size="small" fullWidth={true}
                onChange={(e)=>
                {
                    props.setnewPrice(e.target.value)
                }}/>
        <Button variant="contained"
        onClick={()=>{
            let obj={
                "method": "PUT",
                "body": JSON.stringify({
                    "title": props.title,
                    "description": props.newdescription,
                    "price": props.newprice
                }),
                "headers": {
                    "content-type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            }
            fetch("http://localhost:3000/admin/courses/"+props.title,obj).then((response_object)=>{
                response_object.text().then((data)=>{
                    let a = document.getElementById("statusarea")
                    a.innerHTML = "<Typography variant='h6'><b>Status:- "+data+"</b></Typography>"
                    props.setChanging(!(props.changing))
                })
            })
        }}>Edit</Button>
        </Card>
        <br></br><br></br>
            <Card style={{width: "400px",padding: "20px", marginLeft: "auto", marginRight: "auto"}}>
                <div id="statusarea">
                    
                </div>
            </Card>
        </>
    )
}

export default EditCourse