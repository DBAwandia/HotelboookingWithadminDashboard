import React, { createContext,useEffect, useReducer} from 'react'

const INITIAL_STATE ={
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading : false,
    err: null
}

export const RegisterContext = createContext( INITIAL_STATE)

const registerReducer = (state,action) =>{
    switch(action.type){
        case "REGISTER_START":
            return {
                user: null,
                loading: true,
                err: false
            }
        case "REGISTER_SUCCESS":
            return{
                user:action.payload,
                loading: false,
                err: false,
            }
        case "REGISTER_FAIL":
            return {
                user: null,
                loading: false,
                err: action.payload
            }
        default: 

            return state
    }
}

export const RegisterContextProvider = ({children}) =>{
    const [ state, dispatch ] = useReducer(registerReducer, INITIAL_STATE)
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return(
    <RegisterContext.Provider value={{ user:state.user, loading: state.loading, err: state.err, dispatch}}>
        {children}
    </RegisterContext.Provider>
    )
}