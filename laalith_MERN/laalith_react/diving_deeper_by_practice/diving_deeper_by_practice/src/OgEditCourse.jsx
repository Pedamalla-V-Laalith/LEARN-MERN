/*
In order to see this file in action replace EditCourse in App.jsx with OgEditCourse

The updated version of this code which is state management using some state management libraries in the file
EditCourse.jsx 
So after learning everything properly in this file check out that file file and learn about state management.
*/


import { Button, Card, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function OgEditCourse()
{
    console.log("hi from OgEditCourse")
    let { title } = useParams()
    //this above line gets us the value stored in title params
    const [courseDetails, setDetails] = useState({})
    const [changing, setChanging] = useState(false)
    const [newdescription, setnewDescription] = useState("")
    const [newprice,setnewPrice] = useState("")
    // useEffect(()=>{
    //     let obj = {
    //         "method": "GET",
    //         "headers": {
    //             "Authorization": "Bearer "+ localStorage.getItem("token")
    //         }
    //     }
    //     fetch("http://localhost:3000/admin/courses/"+title,obj).then((response_object)=>{
    //         if(response_object.headers.get('Content-Type').includes('text/plain'))
    //         {
    //             response_object.text().then((data)=>{
    //                 alert(data)
    //             })
    //         }
    //         else if(response_object.headers.get('Content-Type').includes('application/json'))
    //         {
    //             response_object.json().then((data)=>{
    //                 setDetails({
    //                     "title": title,
    //                     "description": data.description,
    //                     "price": data.price
    //                 })
    //             })
    //         }
    //     })
    // }, [courseDetails])
    /*
    Here above you can see that we are using dependencies
    we already learned what are dependencies in the previous projects.
    so basically why we are doing this is, If you remove the dependencies and check then you will observe
    that after you clicked on edit button below the data inside Course component is not getting updated to the new data
    it is still showing the old data. It will only change when we refresh the page since the backend already stored the new data
    We want to update that instantly when we press edit
    So in the above useEffect we mentioned courseDetails as the dependency
    because of this useEffect will get executed everytime courseDetails is changed/updated. and you might notice that inside 
    useEffect courseDetails is getting changed resulting in an infinite loop which executed useEffect multiple times and results in
    sending infinite fetch requests. So whenever a change in the course is registered in the backend it will immediately get rendered here due to continuous fetch requests
    As we can already guess this is very tedious approach resulting in an infinite loop
    */



   /*
   A simple way to solve this is to break the infinite loop but at the same time 
   we should make the useEffect below to get executed everytime edit button is clicked 
   but only once per one click
   */
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
/*
Now here in the above useEffect we broke the loop by executing useEffect whenever the variable changing changes
and changing is only changed when edit button is clicked and the update at the backend is also successfull.
*/
    return (
        <>
        <CourseCard course = {courseDetails}></CourseCard>
        <EditCard setnewDescription = {setnewDescription} setnewPrice = {setnewPrice} setChanging = {setChanging}
                  title = {title} newdescription = {newdescription} newprice = {newprice} changing = {changing}>  </EditCard>
        {
            /*
            Here as you can see we are sending in the state variables and it's appropriate state functions into the 
            EditCard component and we are using them using props.
            Yes, we can do this and whenever the state functions are executed to update a state variable, then this happens:-
            for example:-
            When you call setChanging(!changing); inside the EditCard, it updates the changing state variable, which is defined in the OgEditCourse.
            React detects the state change and schedules a re-render of the component tree starting from the component where the state change occurred, 
            which is the EditCard. As a result, both the EditCard and the OgEditCourse are re-rendered to reflect the updated state.
            */
        }
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
                    //this above value let's the changing varaible value to change between true and false
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

export default OgEditCourse