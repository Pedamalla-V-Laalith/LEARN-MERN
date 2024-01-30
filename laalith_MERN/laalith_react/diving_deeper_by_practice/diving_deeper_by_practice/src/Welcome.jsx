import { Button, Card, Typography } from "@mui/material";

function Welcome()
{
    return (
        <>
        
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
        <Card style={{
            marginTop: "150px",
            width: "400px",
            padding: "20px",
            textAlign: "center"
        }}>
        <div style={{
            textAlign: "center",
            marginBottom: "15px"
        }}>
            <Typography variant="h5"><b>Welcome to the Course Selling App!</b>
            <br></br>
            <b>Let's get started</b></Typography>
        </div>
        <Button variant="contained" size="small"
            onClick={()=>{
                //here we are basically creating a function which changes
                //the route to a particular other route when we click this button
                window.location = "/signup"
                //but there is actually a problem with this. The thing is
                //whenever a route changes the page kind of reloads when
                //we use this function, we don't want that to happen
            }}>Signup</Button>
            <span> </span>
            <Button variant="contained" size="small"
            onClick={()=>{
                window.location = "/login"
            }}>Login</Button>
        </Card>
        </div>
        </>
    )
}
export default Welcome