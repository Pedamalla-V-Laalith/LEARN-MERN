import {createStore, combineReducers, applyMiddleware} from "redux"
import cakeReducer from "./cakes/cakeReducer"
import icecreamReducer from "./icecream/icecreamReducer"
import logger from "redux-logger"
import {composeWithDevTools} from "redux-devtools-extension"


const rootReducer = combineReducers({
    cake : cakeReducer,
    icecream : icecreamReducer
})
//composeWithDevTools function is really useful in the case of extension in 
//the browser redux devtools
//this is helpful during the development process.
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))

export default store