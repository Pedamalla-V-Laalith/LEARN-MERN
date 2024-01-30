const redux = require("redux")
const createStore = redux.createStore
/*
Note that there are three main concepts of redux
1.)Store:-
Store contains the state of the entire application.
2.)Action:-
Action is something that resembles a trigger of the gun
action describes what actually happened
for example in a cake shop a cake is bought, then the action basically says
that the cake number should be decreased by one.
3.)Reducers:-
Reducers are pure functions which are executed when an action is triggered
for example when a cake is bought, reducer is responsible for decreasing the number 
of cakes by one.

There are three principles of redux:-
1 :- The state of our whole application is stored in an object tree within a single store
*Maintain our application state in a single object which would be managed by the redux store.
2 :- The only way to change the state is to emit an action, an object describing what happened.
*To update th state of your app, you need to let redux know about that with an action.
*Not allowed to directly update the state object.
3 :- To specify how the state tree is transformed by actions, you write pure reducers which are basically functions
*Reducers take in two arguments, one is the previous state and the other one is the action.
*and instead of directly updating the state they return the new state.
*/

//let us now implement actions.

//we should define a string constant that represents an action's type
const BUY_CAKE = "BUY_CAKE"
//now action is basically an object (action is an object which has type property)
//and action has a type property
/*
{
    type : BUY_CAKE,
    info : "First redux action"
}
this above object can also be an action
//other than type we can also have other properties like info
*/
//but we can also create function which are known as action creators 
//these functions basically return the action objects.
function buyCake() 
{
    return {
        type : BUY_CAKE,
        info : "First redux action"
    }
}

//let us now implement reducers

//A reducer is basically a function which accepts previous state and action 
//as arguments and returns the new state
//let us assume our state looks like something below
const initialState = {
    numOfCakes : 10
}
//reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE : return {
            numOfCakes : state.numOfCakes - 1
        }

        default : return state
    }
}

//let us now implement store

/*
Store has many responsibilities
--> Holding the application state
--> It gives us a method getState() which allows the application to access the current state.
--> It also provides a method dispatch(action) to allow the application to change the state
--> The store also allows the application to register listeners through subscribe method subscribe(listener). The Subscribe method accepts a function as a parameter
    which is executed any time the state in the redux store changes.
--> We can also unsubscribe a listener by executing the function returned by the subscribe method.
*/
const store = createStore(reducer)
console.log(store.getState())
store.dispatch(buyCake())
const unsubscribe = store.subscribe(()=> console.log("Updated state",store.getState()))
//now when you dispatch the action then the reducer will get executed
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch({type : "some random"})
unsubscribe()
store.dispatch(buyCake())
console.log("Final State",store.getState())