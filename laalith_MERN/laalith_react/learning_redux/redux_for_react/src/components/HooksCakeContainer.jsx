/*
Before in CakeContainer component we saw how the connect function works
and we even saw how the mapStateToProps and mapDispatchToProps works
here instead of those two map... functions we use two hooks provided by the
react-redux library named as:-
useSelector hook, and useDispatch hook
*/
import { useSelector, useDispatch} from "react-redux"

function HooksCakeContainer()
{
    console.log("HooksCakeContainer")
    //basically useSelector hook also accepts an argument which is a function
    //and the state of the store is passed as an argument to this function.
    //The selector function takes the entire Redux state as its argument and 
    //returns the specific piece of state that the component needs. 
    //It can be a simple or complex function based on the structure of your Redux store.

    //The useDispatch hook provides a reference to the dispatch function from the Redux store. 
    //This allows the component to dispatch actions, which in turn can 
    //modify the state in the Redux store.
    /*
    Possible Question:- will only those components re-render which uses useSelector hook 
    or will those components which use useDispatch also re-render in the 
    component tree when the state changes

    Answer:-
    Components using useSelector: Only components that use useSelector with the specific 
    piece of state being selected will re-render when that particular piece of state changes. 
    This is because useSelector subscribes the component to updates for the 
    selected part of the Redux store.

    Example:
    const user = useSelector(state => state.user);
    In this case, only the component containing this useSelector hook 
    will re-render when the user state changes.

    Components using useDispatch don't automatically re-render when the state changes. 
    The purpose of useDispatch is to provide a way for components to dispatch actions, 
    which can lead to state changes. Components that trigger actions through useDispatch 
    may trigger a re-render if the action results in a state change that is relevant to the component.
    */
    const numOfCakes = useSelector((state)=>{return state.cake.numOfCakes})
    const dispatch = useDispatch()
    return (
        <>
        <h2>Number of Cakes :- {numOfCakes} </h2>
        <button onClick={() => {dispatch({type : "BUY_CAKE"})}}>Buy Cake</button>
        </>
    )
}

export default HooksCakeContainer