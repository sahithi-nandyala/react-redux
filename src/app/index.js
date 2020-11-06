import React from "react";
import { render } from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from 'redux-logger'; //export as default logger, so no {}
import App from './container/App';
import {Provider} from 'react-redux';
 // create an object/array as an initial state (which we are passing as a 2nd parameter in store) and we can assign it directly to state param in reduces and get rid of it in the createStrore()

// One reducer can handle multiple actions
const mathReducer = (state = {
    result: 1,
    lastValues: []
 }, action) => {
     switch(action.type) {
         case "Add":
           //  state.result+= action.payload;// 11 // we get our state to the reducer and add that to value, update the state and return
            state = {
               ...state,
               result: state.result + action.payload,
               lastValue: [...state.lastValue, action.payload]
           };
            break;
        case "SUBTRACT":
            //state.result-= action.payload;// 6 ..need to make it immutable
            state = {
                /*
                result: state.result,
                lastValues:state.lastValues
                */
                ...state,// this way we are making it immutable
                result:state.result - action.payload,
                lastValue: [...state.lastValue, action.payload]
            };
            break;
    }
    return state; // new state our application use from this point on.. And this state here is mutable since same one is used acrross the application.. So it
};

const userReducer = (state = {
    name: "sahithi",
    age: 24
 }, action) => {
     switch(action.type) {
         case "SET_NAME":
           //  state.result+= action.payload;// 11 // we get our state to the reducer and add that to value, update the state and return
            state = {
               ...state,
               name: action.payload,
           };
            break;
        case "SET_AGE":
            //state.result-= action.payload;// 6 ..need to make it immutable
            state = {
                /*
                result: state.result,
                lastValues:state.lastValues
                */
                ...state,// this way we are making it immutable
                age: action.payload 
            };
            break;
    }
    return state; // new state our application use from this point on.. And this state here is mutable since same one is used acrross the application.. So it
};
// Middleware logging part
const myLogger = (store) => (next) =>(action)=> {
    console.log('Logged Actions',action);
    next(action);
}
/**
 * (reducers,initial state of app)
 */
// reducer must return a state..Else it causes errors..//1 js obj may have seceral substates // remove 2nd arg '1'
//to pass the state
const store = createStore(combineReducers({math: mathReducer, user: userReducer}),
{},
applyMiddleware(myLogger,logger()) //logger() is the 3rd party middleware
); 
store.subscribe(()=> {
    console.log("Store updated", store.getState());
});
// store dispatches( since store knows who is handling it, and store doen't handle the actions) the action to reducer as reducer handles the action and reducer results the new state to store..
// store.dispatch(action)
/**we need a valu( a payload) to this action if you add other pkgs which enhance redux functionality, often times expect payload as a name to be used here */
// store.dispatch({
//     type: "Add", //Make sure to use unique action types
//     payload: 10
// });
// store.dispatch({
//     type: "SUBTRACT",
//     payload: 5
// });
// store.dispatch({
//     type: "SET_NAME",
//     payload: "MAX"
// });
// store.dispatch({
//     type: "SET_AGE",
//     payload: 30
// });
//Provider from react-redux pkg wraps our whole App component 
render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('app'));