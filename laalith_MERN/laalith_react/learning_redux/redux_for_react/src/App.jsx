import CakeContainer from "./components/CakeContainer"
import HooksCakeContainer from "./components/HooksCakeContainer"
//in order to make use of redux in react application we make use of a component
//given to us by react-redux library which is known as Provider.
//we need to pass the store of our application as a prop to this Provider
//component
//this ensures that the store is accessible by every component in react component tree
//basically all the components wrapped up in the specific Provider component.
import {Provider} from "react-redux"
import store from "./redux/store"
import IcecreamContainer from "./components/IcecreamContainer"

function App() {

  return (
    <>
      <Provider store={store}>
      <div>
        <CakeContainer></CakeContainer>
        <br></br>
        <IcecreamContainer></IcecreamContainer>
        <br></br><br></br>
        <h1>
          Now Let's work with component which does not use connect function
          <br/>
          Understand the above component first then come to the below component
        </h1>
        <br></br><br></br>
        <HooksCakeContainer></HooksCakeContainer>
        <br></br>
        <IcecreamContainer></IcecreamContainer>
      </div>
      </Provider>
    </>
  )
}

export default App
