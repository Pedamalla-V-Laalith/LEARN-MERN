//we already learnt how to work with just one reducer and one initial state
//now let's learn how to work with multiple states and multiple reducers to modulate the code
//in a better fashion.
//we can also acheive this with only one initial state having many properties
//and one reducer function working with multiple actions
//but this will get difficult to manage as our project gets larger

const redux = require("redux")
const createStore = redux.createStore
const combineReducers = redux.combineReducers

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

const store = createStore(rootReducer)
console.log(store.getState())
//and by the way when you dispatch an action all the reducers in the root reducer
//will act on that action.
store.dispatch({type : "BUY_CAKE"})
const unsubscribe = store.subscribe(()=> console.log("Updated state",store.getState()))
store.dispatch({type : "BUY_CAKE"})
store.dispatch({type : "BUY_ICECREAM"})
store.dispatch({type : "BUY_CAKE"})
store.dispatch({type : "BUY_ICECREAM"})
store.dispatch({type : "some random"})
unsubscribe()
store.dispatch({type : "BUY_CAKE"})
console.log("Final State",store.getState())