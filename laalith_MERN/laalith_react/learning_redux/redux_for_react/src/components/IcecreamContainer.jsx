import buyIcecream from "../redux/icecream/icecreamActions"
import { connect } from "react-redux"

function IcecreamContainer(props)
{
    console.log("IcecreamContainer")

    return (
        <>
        <h2>Number of Icecreams :- {props.numOfIcecreams} </h2>
        <button onClick={props.buyIcecream}>Buy Icecream</button>
        </>
    )
}

function mapStateToProps(state)
{
    return {
        numOfIcecreams : state.icecream.numOfIcecreams
    }
}
function mapDispatchToProps(dispatch)
{
    return {
        buyIcecream : () => dispatch(buyIcecream())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(IcecreamContainer)
