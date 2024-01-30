const initialState = {
    numOfIcecreams : 20
}

function icecreamReducer(state = initialState, action)
{
    switch(action.type)
    {
        case "BUY_ICECREAM" : return {
            ...state,
            numOfIcecreams : state.numOfIcecreams - 1
        }
        default : return state
    }
}

export default icecreamReducer