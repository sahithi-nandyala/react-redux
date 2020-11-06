// import React from "react";
// import {render} from "react-dom";

// import { User } from './components/User';
// import { Main } from './components/Main';

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: "Max"
//         };
//     }

//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }

//     render() {
//         return (
//             <div className="container">
//                 <Main changeUsername={this.changeUsername.bind(this)}/>
//                 <User username={this.state.username}/>
//             </div>
//         );
//     }
// }

// render(<App />, window.document.getElementById('app'));
import { createStore } from "redux";
// create an object/array as an initial state (which we are passing as a 2nd parameter in store) and we can assign it directly to state param in reduces and get rid of it in the createStrore()
const initialState = {
    result: 1,
    lastValues: [],
    username: "Max"
};
// One reducer can handle multiple actions
const reducer = (state = initialState, action) => {
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
/**
 * (reducers,initial state of app)
 */
// resucer must return a state..Else it causes errors
const store = createStore(reducer); // remove 2nd arg '1'
//to pass the state
store.subscribe(()=>{
    console.log("Store updated", store.getState());
});
// store dispatches( since store knows who is handling it, and store doen't handle the actions) the action to reducer as reducer handles the action and reducer results the new state to store..
// store.dispatch(action)
/**we need a valu( a payload) to this action if you add other pkgs which enhance redux functionality, often times expect payload as a name to be used here */
store.dispatch({
    type: "Add",
    payload: 10
});
store.dispatch({
    type: "SUBTRACT",
    payload: 5
});