import { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
function Signup()
{
    const navigate = useNavigate()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    /*
    Now we will get to the concepts of css
    in react you can basically style an element by having style attribute in the
    opening tag of the element
    and you need to give all the styles in two curly braces
    for example:-
    <div style={{
        backgroundColor: "green",
        margin: auto
    }}></div>
    
    here in the above element we styled the div to have a background color
    of green and if you know a little bit of css you know that using
    margin: auto will make the div equidistant from adjacent elements 
    in x-axis and in y-axis (simply from left-right and top-bottom)
    */

    /*
    Now we can style all the components by ourselves that is not an issue
    but in real life we won't do that because it is incredibly tedious 
    some people devised certain predefined styles/frameworks that we can use
    we will also use that to make our lives much more easier.
    one such framework in known as mui (Material User Interface)
    in order to use it you can go to mui.com
    and you will also be required to run a command:-
    npm install @mui/material @emotion/react @emotion/styled
    in the terminal
    */
    return (
        <>
        {/* <div style={{
            textAlign: "center",
            marginTop: "150px",
            marginBottom: "15px"
        }}>
            Welcome to the course selling app
            <br></br>
            Please signup below
        </div>
        <div style={{
            border: "2px solid black",
            marginLeft: "auto",
            marginRight: "auto",
            padding: '10px 0px',
            textAlign: "center",
            width: "400px"
        }}>
        Username:- <input type="text"></input>
        <br></br>
        Password:- <input type="password"></input>
        <br></br>
        <button>Sign Up</button>
        </div> */}
        {
            /*
            Now the above code does work as expected but it is not that pretty
            so we will use the components provided by mui
            suggestion:- go to mui.com and go to components you will find
            different components over there which has a lot of variants(like different styles)
            so you can choose appropriately and kind of also known how exactly can we
            use them
            */
           /*
           in order to use a component you first need to import that particular
           component.
           for example if you want to import Button component then you need to write this command on top:-
           import Button from '@mui/material/Button'
           */
        }
        <div style={{
            textAlign: "center",
            paddingTop: "150px",
            marginBottom: "15px"
        }}>
            <Typography variant="h5"><b>Welcome to the course selling app</b>
            <br></br>
            <b>Please signup below</b></Typography>
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
            //In React, the .target property is commonly used when handling events such as the onChange, 
            //onClick, or onSubmit events. It allows you to access the DOM element that triggered the event 
            //and retrieve information about that element or its value.
            //so basically we are modifying the data of username state variable to the data in this TextField
            //And also one more thing you might think calling this state function setUsername 
            //will result in multiple continuous rerenderes happening but don't worry it won't happen
            //beacuse when something is changed in this TextField then setUsername is called which results in 
            //Signup component getting rerendered again, but it will not result in setUsername getting called again cause this state variable will
            //only get executed when onChange gets executed
        }}/>
        <br></br>
        <TextField id="password" label="Password" size="small" type="password" variant="outlined" 
        onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <br></br>
        <Button size="small" variant="contained"
        onClick={()=>{
            let obj={
                method: "POST",
                body: JSON.stringify({
                    // "username": document.getElementById("username").value,
                    // "password": document.getElementById("password").value
                    //Although the above method works to get data from TextFields, it's not the best method
                    //the best method is to use state management.
                    /*
                    the way which most people use is basically a state variable
                    they want to get a particular data stored in state variables from a particular TextField
                    the moment any change of data happens in the TextField.
                    For this we have to add an attribute to the TextFields which is onChange
                    this attribut takes in a function which gets executed everytime value in TextField changes
                    */
                   "username" : username,
                   "password": password
                }),
                headers: {
                    "content-type": "application/json"
                }
            }
            fetch("http://localhost:3000/admin/signup",obj).then((response_object)=>{
                /*
                   Note:- please note that we first have to check whether the body's format of response is
                   Json or text in order to do that we have to access the Content-Type key in the headers 
                   section of response_object
                */
                if (response_object.headers.get('Content-Type').includes('application/json'))
                {
                    response_object.json().then((data)=>{
                        /*
                        Here we all know that we get the response json body's data here
                        now the backend code we wrote gives us a json which contains either only
                        a text if either singup/login is failed, or a json which has a message and token
                        if login/signup is successfull
                        Now when we get the token we need to store it somewhere to use.
                        the user might make his pc sleep or go somewhere but the token should still be
                        stored somewhere so that the user (assuming there are other routes which come after login/signup)
                        can be authenticated to access other routes which needs the token.
                        so the question is where can we store it?
                        the answer is local storage. we can store it somewhere in the browser.
                        now let us understand how we can do that
                        */
                       console.log(data.Status)
                       localStorage.setItem("token", data.token)
                       /*
                       Here what we did is we created a new item in local storage
                       the new item will have a key named as token and the value will be 
                       token itself which is used to authenticate the user.
                       now this item will be in local storage no matter whether you shut down 
                       your laptop, close the browser, or shut down the app in the browser
                       this item will still be in the local storage.
                       If you want to remove the data you have to manually do it we will come to that later on how to do it.
                       */
                    })
                }
                else if (response_object.headers.get('Content-Type').includes('text/plain'))
                {
                    response_object.text().then((data)=>{
                        console.log(data)
                    })
                }
            })
            //window.location = "/login"
            //here we are changing the window that's all
            //But the above method will refresh the page everytime it reroutes
            //we don't want that so what we will do is we will use a hook called as useNavigate
            /*
            You can use the navigate function in response to user actions, like button clicks, form submissions, 
            or any other event that should trigger a route change.
            When navigate is called, it triggers a route change, and the associated route component is rendered. 
            React Router takes care of managing the history stack and rendering the appropriate route component 
            based on the path provided.
            */
           navigate("/login")
           //now using this won't cause our page to get refreshed
           //also note that the component using useNavigate should be present inside Router element in App.jsx
        }}>Signup</Button>
        </Card>
        </div>
        </>
    )
}

export default Signup