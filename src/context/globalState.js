import React, { createContext, useContext, useReducer } from 'react';
import globalReducer from './reducer';

const initialState = {
  posts: [],
  comments: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ value, children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{
      posts: state.posts,
      comments: state.comments,
      dispatch,
      ...value
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
