import {useContext, createContext, useReducer} from 'react'

import { AuthContext } from './AuthContext';
// Create a new context for the chat-related state and actions
export const ChatContext = createContext();

// Define a provider component for the chat context
export const ChatContextProvider= ({children}) => {
    // Access the current user from the AuthContext using useContext hook
    const {currentUser} = useContext(AuthContext);

    // Define the initial state for the chat context
    const INITIAL_STATE = {
        chatId: null, //Initial chat id
        user: {}  //initial user object
    }

    // Define a reducer function to handle state updates
    const chatReducer = (state,action) => {
        switch(action.type){
            case "CHANGE_USER":
                // When the user changes, compute a chatId based on user IDs
                return{
                    user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
                };
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(chatReducer,INITIAL_STATE);

    return(
        <ChatContext.Provider value={{data:state, dispatch }}>
            {children}
        </ ChatContext.Provider>
    )
}




