import { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import { Typography } from "@mui/material"
import { useNavigate }  from "react-router-dom"
import axios from "axios"
function Login()
{
    /*
    Now just so that we know this will work we will now connect it to a backend
    you most probably remember the backend codes we wrote for a course selling app right
    we will surely make a full blown frontend for that backend code but for now in order to learn
    let's just write the frontend codes such that it only send requests to admin routes
    */
   const navigate = useNavigate()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    return (
        <>
        <div style={{
            textAlign: "center",
            paddingTop: "150px",
            marginBottom: "15px"
        }}>
            <Typography variant="h5"><b>Welcome Back!</b>
            <br></br>
            <b>Please Login below</b></Typography>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
        <Card style={{
            width: "400px",
            padding: "20px",
            textAlign: "center"
        }}>
        <TextField id="username" label="Username" size="small" fullWidth={true} variant="outlined" 
        onChange={(e)=>{
            setUsername(e.target.value)
        }}/>
        <br></br>
        <TextField id="password" label="Password" size="small" type="password" variant="outlined" 
        onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <br></br>
        <Button size="small" variant="contained"
        onClick={async ()=>{
            // let obj={
            //     method: "POST",
            //     body: JSON.stringify({
            //         // "username": document.getElementById("username").value,
            //         // "password": document.getElementById("password").value
            //         "username": username,
            //         "password": password
            //     }),
            //     headers: {
            //         "content-type": "application/json"
            //     }
            // }
            // await fetch("http://localhost:3000/admin/login",obj).then((response_object)=>{
            //     if (response_object.headers.get('Content-Type').includes('application/json'))
            //     {
            //         response_object.json().then((data)=>{
            //            console.log(data.Status)
            //            localStorage.setItem("token", data.token)
            //         })
            //     }
            //     else if (response_object.headers.get('Content-Type').includes('text/plain'))
            //     {
            //         response_object.text().then((data)=>{
            //             console.log(data)
            //         })
            //     }
            // })
            // /*
            // In the above code you might notice that we used two keywords async and await
            // async keyword is used before any function to specify that contents inside that function 
            // can be asynchronous
            // await keyword is used the make the thread wait until the fetch function's execution is completed
            // we did this here because in the below code we are reloading the page but this asynchronous fetch function is handled somewhere
            // else. So there is a chance of page getting reloaded before we get our content from the fetch function.
            // */

            //Until now we all saw how to use fetch.
            /*
            Till now we used the promise syntax to operate with fetch and just now we used async syntax to operate with it.
            Now let's learn about an alternative to the fetch which is axios
            In order to operate with axios you first need to install it by running the command "npm install axios"
            After installation we can easily use axios:- 
            High suggestion is to use async await function because it is necessary in our case to fix a bug as we already explained that above.

            */
           let obj = {
            //json which stores the body of the request
            "username": username,
            "password": password
           }
           /*
           By the way when you sending body there is no need for you to send a header which contains
           content-type and all that because axios is smart enough to send a header by default based on the body
           in this case it will by default send a header which contains this key:- "content-type": application/json
           and also the method is specified as below.
           */
           await axios.post("http://localhost:3000/admin/login",obj).then((response)=>{
            /*
            The response object which is stored in response variable through argument
            contains everything related to the response of a request.
            for example:- 

            data: This property contains the response data from the server. 
            The data can be in various formats, such as JSON, text, or binary, 
            depending on the server's response and how you've configured the request. 
            You can access the response data using response.data.

            status: The status property represents the HTTP status code returned by the server. 
            It typically indicates whether the request was successful, encountered an error, 
            or any other relevant status. This can be accessed by response.status.

            headers: The headers property is an object containing the HTTP headers sent by the server in the response. 
            You can access specific headers using their names. This can be accessed by response.headers.

            config: The config property contains the configuration object used for the request. 
            This includes the request method, URL, headers, and other options. This can be accessed by response.config.
            */
            if (response.headers.get('Content-Type').includes('application/json'))
            {
                localStorage.setItem("token", response.data.token)
            }
            else if (response.headers.get('Content-Type').includes('text/plain'))
            {
                console.log(response.data)
            }

           })
           //we can also send customized headers by sending a third argument in the axios.post() function (by the the post can be any other method too)
           //in second argument we are sending an object which contains body
           //in the third argument we can send an object which contains the object of headers.
           //for more details do chatgpt on how to send headers through axios.
            //window.location = "/addcourse"
            navigate("/addcourse")
            window.location.reload()
            //this above line actually reloads the page
            //we need to do this in order for the appbar to work properly
            //because after logging in since we used useEffect in appbar 
            //we won't see the changes happening unless we refresh the page
            //since the token will get stored then the appbar component will get called again once the page is refreshed
            //resulting in the appbar getting rerendered
        }}>Login</Button>
        </Card>
        </div>
        </>
    )
}

export default Login