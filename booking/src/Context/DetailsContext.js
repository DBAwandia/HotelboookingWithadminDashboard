import React, {useReducer,createContext,useEffect} from 'react'
const INITIAL_STATE={
    savedData: JSON.parse(localStorage.getItem("savedData")) ||  null,
    loading: false,
    error: null,

}
export const DetailsContext = createContext(INITIAL_STATE)

const DetailsContextReducer = (state, action)=>{
        switch(action.type){
            case "LOADING_DETAILS":
                return{
                    savedData: null,
                    loading: false,
                    error: null,
                }
                case "LOADED_DETAILS":
                    return{
                      
                        savedData:action.payload,
                        loading: true,
                        error: null,
                    }
                    case "ERROR_DETAILS":
                        return{
                            savedData: null,
                            loading: false,
                            error: action.payload,
                        }
                        default: {
                            return state
                        }
    }
}

export const DetailsContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(DetailsContextReducer, INITIAL_STATE)
    useEffect(()=>{
        localStorage.setItem("savedData", JSON.stringify(state.savedData))
    },[state.savedData])
    return(
        <DetailsContext.Provider value={{
            savedData:state.savedData, error: state.error,loading: state.loading,dispatch}}>
                {children}
        </DetailsContext.Provider>
    )
 

}