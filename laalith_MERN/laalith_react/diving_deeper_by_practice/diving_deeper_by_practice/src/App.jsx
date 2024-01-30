import { useState } from 'react'
import { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { RecoilRoot } from 'recoil'
import './App.css'
import Signup from "./Signup.jsx"
import Appbar from "./Appbar.jsx"
import Login from "./Login.jsx"
import Welcome from './Welcome'
import AddCourses from "./AddCourses"
import AllCourses from './AllCourses'
import CleanEditCourse from './CleanEditCourse'
/*
We all remember the course selling app that we did in mongodb folder right
today we will try to dive deeper into react by making webpages using react
right now we will try to create an login/signup dashboard webpage using react
we might do something more than that but for now this is my plan for this folder.
(but we might do more in this folder itself)
*/
/*
In this project if you do not understand a particular segment of any code which is completely new
then don't worry it might get explained later on in some other file you will know about this soon. just don't worry
*/
function App() {
  

  return (
    <>
    {
      //here we will create a new component in another file in the same 
      //directory (src) and import it in this file which is App.jsx
      //And also let's get familiar with routing
      //getting different components redered in the DOM aacording to the routes 
      //is actually taken care of by state management usually
      //but here we will do it through routing
    }
    <div style={{
      backgroundColor: "#eeeeee",
      // width: "100vw",
      height: "full",
      minHeight: "100vh"
    }}>
      <RecoilRoot>
      <Router>
      <Appbar></Appbar>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/addcourse" element={<AddCourses/>} />
          <Route path="/courses" element={<AllCourses/>} />
          <Route path="/editcourse/:title" element={<CleanEditCourse/>} />
        </Routes>
      </Router>
      </RecoilRoot>
    </div>
    </>
  )
  /*
  Check out EditCourse component to see why we added RecoilRoot
  */
}

export default App
