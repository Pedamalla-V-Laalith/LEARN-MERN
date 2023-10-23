import { Button, Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Appbar()
{
    const navigate = useNavigate()
    const [user,setUser] = useState(null)
    /*
    Below we are sending a fetch request only if there exists a token item in the localstorage
    to avoid unnecessary requests from being sent even if the token doesn't exist.
    We are using useEffect to send the request only once for an entire duration
    but pls note that all the hooks will run once more when the page refreshes.
    when the page refreshes all the state variables will start from the beginning
    that's why we are refreshing the page when logging in and logging out to make changes in the appbar accordingly
    */
   /*
   WORK to do:-
   study this when you are done inspecting the code:-
   when i used localstorage.setItem("token",null) that means i explicitly gave the value null to the token key
   But even then the below code is running i couldn't figure out why. It is only working when i delete the entire token item itself
   So please try to figure it out on your end
   */
    if(localStorage.getItem("token") != null)
    {
        useEffect(()=>{
            let obj = {
                "method": "GET",
                "headers": {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
            fetch("http://localhost:3000/admin/me",obj).then((response_object)=>{
                if(response_object.status == 200)
                {
                    response_object.text().then((data)=>{
                        setUser(data)
                    })
                }
            })
        }, [])
    }

    if(user == null)
    {
        return (
            <>
            {
                /*
                Now here we will learn a new concept known as flexbox
                Flexbox, or the Flexible Box Layout, is a CSS layout model 
                that provides an efficient way to arrange and 
                distribute space among items in a container, 
                even when their sizes are unknown or dynamic.
                */
            }
            <Card>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
                backgroundColor: "rgb(200,200,200)"
            }}>
                <div>
                <Typography variant="h5"><em><b>Course Selling App</b></em></Typography>
                </div>
                <div>
                <Button variant="contained"
                onClick={()=>{
                    navigate("/signup")
                }}>Signup</Button>
                <span> </span>
                <Button variant="contained"
                onClick={()=>{
                    navigate("/login")
                }}>Login</Button>
                </div>
            </div>
            </Card>
            </>
        )
    }
    else
    {
        return (
            <>
            {
                /*
                Now here we will learn a new concept known as flexbox
                Flexbox, or the Flexible Box Layout, is a CSS layout model 
                that provides an efficient way to arrange and 
                distribute space among items in a container, 
                even when their sizes are unknown or dynamic.
                */
            }
            <Card>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
                backgroundColor: "rgb(200,200,200)"
            }}>
                <div>
                <Typography variant="h5"><em><b>Course Selling App</b></em></Typography>
                </div>
                <div>
                <Typography style={{display: "inline"}} variant="h6"><b> { user } </b></Typography>
                <span> </span>
                <Button variant="contained"
                onClick={()=>{
                    localStorage.removeItem("token")
                    window.location = "/"
                }}>Logout</Button>
                </div>
            </div>
            </Card>
            </>
        )
    }
}

export default Appbar