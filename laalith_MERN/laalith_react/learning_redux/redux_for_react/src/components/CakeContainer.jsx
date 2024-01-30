import buyCake from "../redux/cakes/cakeActions"
import { connect } from "react-redux"

function CakeContainer(props)
{
    console.log("CakeContainer")

    return (
        <>
        <h2>Number of Cakes :- {props.numOfCakes} </h2>
        <button onClick={props.buyCake}>Buy Cake</button>
        </>
    )
}

function mapStateToProps(state)
{
    //this function gets a redux state as a parameter and returns an object.


    //Please note that this function can even accept a second argument which
    //gets the value of the props passed to the component
    //if you didn't quite understand this read completely and then visit this back
    return {
        numOfCakes : state.cake.numOfCakes
    }
}
function mapDispatchToProps(dispatch)
{
    //this function gets dispatch function as a parameter and returns an object
    //in the object the key buyCake contains a function which dispatches BUY_CAKE action

    //Please note that this function can even accept a second argument which
    //gets the value of the props passed to the component
    //if you didn't quite understand this read completely and then visit this back
    return {
        buyCake : () => dispatch(buyCake())
    }
}
//now we are going to connect the above two functions with the react component
/*
In `react-redux`, the `connect` function is used to connect a React component to a Redux store. 
It is a higher-order component (HOC) that wraps your component and provides it with the data and actions 
it needs from the Redux store without directly passing them down through props.

Here's a basic overview of how `connect` works:

1. **Map State to Props:**
   The first argument to `connect` is a function called `mapStateToProps`. 
   It allows you to specify which data from the Redux store your component needs. 
   This function takes the entire Redux state as a parameter and returns an object. 
   The properties of this object become the props of your component.

    
    const mapStateToProps = state => {
      return {
        user: state.user,
        posts: state.posts
      };
    };
    

2. **Map Dispatch to Props:**
   The second argument to `connect` is `mapDispatchToProps`, 
   which allows you to specify which actions you want to dispatch. 
   This can be an object with action creators or a function. 
   The properties or methods provided become the props of your component.

    
    const mapDispatchToProps = dispatch => {
      return {
        updateUser: user => dispatch(updateUser(user)),
        fetchPosts: () => dispatch(fetchPosts())
      };
    };
    

3. **Connect Component:**
   The `connect` function is then used to wrap your component, 
   passing in the `mapStateToProps` and `mapDispatchToProps` functions. 
   It returns a new component that is connected to the Redux store.

    
    import { connect } from 'react-redux';
    
    const ConnectedComponent = connect(
      mapStateToProps,
      mapDispatchToProps
    )(YourComponent);
    

Now, `ConnectedComponent` has access to the specified parts of the Redux store as props, and it can dispatch actions.


// In YourComponent.js
console.log(this.props.user); // Access user from the Redux store
this.props.updateUser(newUser); // Dispatch the updateUser action


This pattern helps in keeping your components more focused on rendering and behavior, while Redux-related logic is separated.
*/
export default connect(mapStateToProps,mapDispatchToProps)(CakeContainer)
/*
In Redux, when the state changes, the components that are connected to 
the relevant parts of the state will automatically re-render. 
This is made possible through the integration of React with Redux using 
the connect function from react-redux.

When you connect a component to the Redux store using connect, 
it subscribes to the store updates. The connected component will be 
re-rendered whenever the state changes.

note that:- 
mapStateToProps can return only a small part of the state
and if that small part gets updated then this component will be re-rendered
but if some other part of the state gets updated then this part will not
be rerendered
*/