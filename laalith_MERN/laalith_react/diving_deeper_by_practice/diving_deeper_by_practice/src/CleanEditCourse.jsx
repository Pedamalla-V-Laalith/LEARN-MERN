/*
In order to have a progressive learning first visit the OgEditCourse file and then EditCOurse file
*/
/*
In this file we are going to use grids to make our DOM look prettier.
*/
/*
Please search about grids on youtube to know about it better
*/
import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function CleanEditCourse()
{
    console.log("hi from CleanEditCourse")
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
        <TitleCard title = {title}></TitleCard>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
            <EditCard setnewDescription = {setnewDescription} setnewPrice = {setnewPrice} setChanging = {setChanging}
                  title = {title} newdescription = {newdescription} newprice = {newprice} changing = {changing}>  </EditCard>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
            <CourseCard course = {courseDetails}></CourseCard>
            </Grid>
        </Grid>        
        </>
    )
}

function TitleCard({title})//doing this: {title} is also object destructuring
{
    return (
        <>
        <div style={{
            backgroundColor: "rgba(25,31,52,1.0)",
            height: "250px",
            marginBottom: "-250px",
            width: "100vw",
            zIndex: 0
            //zIndex is used to determine on what components does this component can overlap
            //any small zIndex valued component will get overlapped by components with larger zIndex
        }}>
            <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
            </div>
        </div>
        </>
    )
}

function CourseCard(props)
{
    console.log("hi from CourseCard")
    return (
        <>
        <Card style={{marginTop: "150px",marginLeft: "auto", marginRight: "auto", padding:"10px", width:"300px", minHeight:"200px", zIndex: 1}}>
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
        <div style={{zIndex: 1, marginTop: "280px"}}>
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
        <br></br>
            <Card style={{width: "400px",padding: "20px", marginLeft: "auto", marginRight: "auto"}}>
                <div id="statusarea">
                    
                </div>
            </Card>
            </div>
        </>
    )
}

export default CleanEditCourse