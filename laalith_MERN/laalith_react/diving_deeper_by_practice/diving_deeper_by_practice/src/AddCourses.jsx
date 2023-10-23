import { Button, Card, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddCourses()
{
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    return (
        <>
            <div style={{
                textAlign: "center",
                marginTop: "150px"
            }}>
                <Typography variant="h5">Please enter the details of the course you wanna add</Typography>
            </div>
            <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Card style={{width: "400px", padding:"20px", textAlign:"center"}}>
                <TextField label="Title" variant="outlined" size="small" fullWidth={true}
                onChange={(e)=>
                {
                    setTitle(e.target.value)
                }}/>
                <TextField label="Description" variant="outlined" size="small" fullWidth={true}
                onChange={(e)=>
                {
                    setDescription(e.target.value)
                }}/>
                <TextField label="Price" variant="outlined" size="small" fullWidth={true}
                onChange={(e)=>
                {
                    setPrice(e.target.value)
                }}/>
                <Button variant="contained" size="small"
                onClick={()=>
                {
                    let obj = {
                        method: "POST",
                        body: JSON.stringify({
                            "title": title,
                            "description": description,
                            "price": price
                        }),
                        headers: {
                            "content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                            //now this how you retrieve the value from local storage
                            //Note that there sare some security policies in place
                            //such that Only JavaScript running in the same browser context 
                            //as the localStorage data can access it. This means that if you have 
                            //a webpage with JavaScript, that JavaScript code can access localStorage for that webpage.
                            //not any other javascript code can access local storage of some other website's local storage.
                        }
                    }
                    fetch("http://localhost:3000/admin/courses",obj).then((response_object)=>{
                        response_object.text().then((data)=>{
                            let a = document.getElementById("statusarea")
                            a.innerHTML = "<Typography variant='h6'><b>Status:- "+data+"</b></Typography>"
                        })
                    })
                }}>Submit</Button>
            </Card>
        </div>
        <br></br><br></br><br></br>
            <Card style={{width: "400px",padding: "20px", marginLeft: "auto", marginRight: "auto"}}>
                <div id="statusarea">
                    
                </div>
                <br></br><br></br><br></br>
                <Button variant="contained" size="small" onClick={()=>{
                    navigate("/courses")
                }}>View all courses</Button>
            </Card>
        </>
    )
}

export default AddCourses
