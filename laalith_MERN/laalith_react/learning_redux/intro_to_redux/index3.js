//Now we learn about the usage of Middleware in redux
/*
Middleware is the suggested way to extend redux with custom functionality
It provides a third party extension point between dispatching an action, and
the moment it reaches the reducer.
We can use middlewares for logging, crash reporting, performing async tasks, etc.


for this project we will use middleware named as redux-logger.
*/

const redux = require("redux")
const reduxLogger = require("redux-logger")
const createStore = redux.createStore
const combineReducers = redux.combineReducers
//in order to apply middlewares we need to use the funtion appplyMiddleware
const appplyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const initialCakeState = {
    numOfCakes : 10
}
const initialIceCreamState = {
    numOfIceCreams : 20
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type)
    {
        case "BUY_ICECREAM" : return {
            numOfIceCreams : state.numOfIceCreams - 1
        }
        default : return state
    }
}
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type)
    {
        case "BUY_CAKE" : return {
            numOfCakes : state.numOfCakes - 1
        }
        default : return state
    }
}

const rootReducer = combineReducers({
    iceCream : iceCreamReducer,
    cake : cakeReducer
})

//here while creating the store we need to parse the function applyMiddleware
//and in this function as an argument we will parse the logger which we declared above
//since we want to use the redux-logger middleware
const store = createStore(rootReducer, appplyMiddleware(logger))
console.log(store.getState())
store.dispatch({type : "BUY_CAKE"})
//we removed everything in the subscribe method since now we have the logger middleware to do the same job.
//So basically redux-logger middleware will console logs previous state, next state, and action type when any action is dispatched.
const unsubscribe = store.subscribe(()=> {})
store.dispatch({type : "BUY_CAKE"})
store.dispatch({type : "BUY_ICECREAM"})
store.dispatch({type : "BUY_CAKE"})
store.dispatch({type : "BUY_ICECREAM"})
store.dispatch({type : "some random"})
unsubscribe()
store.dispatch({type : "BUY_CAKE"})
console.log("Final State",store.getState())