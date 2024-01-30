const redux = require("redux")
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require("redux-thunk").thunk
const createStore = redux.createStore
const axios = require("axios")


const initialState = {
    loading : false,
    users : [],
    error : ""
}

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

const fetchUsersRequest = () => {
    return {
        type : FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
}
const fetchUsersFailure = (error) => {
    return {
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case FETCH_USERS_REQUEST : return {
            // loading : true,
            // users : [],
            // error : ""
            //instead of doing it in the above fashion where we need to change
            //only the value of single property but have to mention out all the properties
            //we can execute another way where we make the exact copy of the state
            //by using spread operator and just changing the loading property.
            ...state,
            loading : true
        }
        case FETCH_USERS_SUCCESS : return {
            loading : false,
            users : action.payload,
            error : ""
        }
        case FETCH_USERS_FAILURE : return {
            loading : false,
            users : [],
            error : action.payload
        }
        default : return state
    }
}
/*
Redux actions are plain objects by default and cannot directly perform 
asynchronous operations like making API calls, fetching data, or 
interacting with external APIs. Thunk middleware lets you return 
functions from action creators(action creators are functions which return 
action objects as we learned previously) instead of objects. These functions can 
dispatch other actions based on the results of asynchronous operations, 
enabling you to handle such logic within your actions.
*/
const fetchUsers = () => {
    //now this is an action creator
    //this returns a function which can even handle events which are async
    //and the returned function can also dispatch other actions based on the
    //situations. This is acheived because dispatch function is passed as
    //an argument to this returned function.
    return async function(dispatch) {
        //let's use fake apis from jsonplaceholder website
        dispatch(fetchUsersRequest())
        await axios.get("https://jsonplaceholder.typicode.com/users").then((response)=>{
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch((error)=>{
            dispatch(fetchUsersFailure(error))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
//so basically using redux-thunk middleware enables us to design action creators 
//in such a way that they return functions which takes in 
store.subscribe(()=>{console.log("The state :- ",store.getState())})
store.dispatch(fetchUsers())