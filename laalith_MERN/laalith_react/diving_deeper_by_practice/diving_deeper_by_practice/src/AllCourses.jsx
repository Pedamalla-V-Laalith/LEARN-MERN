import { Button, Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AllCourses()
{
    const [courses, setCourses] = useState([])
    /*
    Here we are using useEffect so that the request is only sent once and not infinite times
    and also you might notice that useEffect is getting executed each and every time the route is changes to /courses
    in the router component is App.jsx
    In order to understand why this is happening, We need to understand how the hooks actually work.
    whenever a component is present in DOM it's lifecycle will start and when it's not present in DOM it's lifecycle will end
    So when the lifecycle starts any hook that can get executed will get executed and during the lifecycle 
    hooks like useState will get executed only once not more than that.
    In our code we are using useEffect here when we navigate to this component through routing 
    it's lifecycle will start we navigate away from this component it's lifecycle will end
    when we again come back it will start again.
    */
    useEffect(()=>{
        let obj = {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        }
        fetch("http://localhost:3000/admin/courses",obj).then((response_object)=>{
            response_object.json().then((data)=>{
                setCourses(data)
            })
        })
    }, [])
    /*
    Now in the below return you might notice that if there are a lot of courses then what this does is it kind
    of fits every course in a single row. Which will make it look very clumsy
    we can get around this by rendering our DOM in such a way that when courses fill a line with appropriate width of 300px in our case
    we need to start to list out the rest of the courses from the next line.
    In order to do that that we will use flexWrap
    */
    // return (
    //     <>
    //     <Typography variant="h2" textAlign={"center"}>List of Courses</Typography>
    //     <br></br><br></br><br></br>
    //     <div style={{display: "flex"}}>
    //         {
    //             courses.map((course)=>{
    //                 return(<Course course={course}></Course>)
    //             })
    //         }
    //     </div>
    //     </>
    // )
    /*
    Let's see how flexWrap works:-
    */
    return (
        <>
        <Typography variant="h2" textAlign={"center"}>List of Courses</Typography>
        <br></br><br></br><br></br>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {
                courses.map((course)=>{
                    return(<Course course={course}></Course>)
                })
            }
        </div>
        </>
    )
    //this above type of return will take care of our requirements
    //run both returns and see what exactly is going on
}

function Course(props)
{
    const navigate = useNavigate()
    return (
        <>
        <Card style={{margin: "10px", padding:"10px", width:"300px", minHeight:"200px"}}>
            <Typography variant="h6" textAlign={"center"}>{props.course.title}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{props.course.description}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{props.course.price}</Typography>
            <Button variant="contained" size="small"
            onClick={()=>{
                navigate("/editcourse/"+props.course.title)
            }}>Edit</Button>
        </Card>
        </>
    )
}

export default AllCourses