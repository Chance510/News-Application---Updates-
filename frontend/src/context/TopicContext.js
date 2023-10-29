import { createContext, useReducer } from "react";

export const TopicContext = createContext();

export const topicReducer = (state, action) => {
    switch(action.type){
        case 'SET_TOPIC':
            return {
                topic: action.payload
            }
        default:
            return state
    }
}

export const TopicContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(topicReducer, {
        topic: 'all'
    })

    return (
        <TopicContext.Provider value = {{...state, dispatch}}>
            {children}
        </TopicContext.Provider>
    )
}