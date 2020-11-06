import React from "react";
import { User } from '../components/User';
import { Main } from '../components/Main';
import { connect } from "react-redux";

class App extends React.Component {
render() {
        // pass the passed state properties below frm the global state in the form of props where redux automatically populates these properties in the props
        return (
            <div className="container">
                <Main changeUsername={() => this.props.setName("Anna")}/>
                <User username={this.props.user.name}/> 
            </div>
        );
    }
}

//Which properties of my global application state do i want to use in this componenent and then to which local properties in this component do i want to map them.
const mapStateToProps = (state) => {
    return {
        user: state.user,
        math: state.math
    };
};
// For Actions I can execute and send to my reducer..Migrate the dispatch function from redux(since we initially wrote it in index.js file) into the react from redux
const mapDispatchToProps = (state) => {
    return {
        setName: (name) => {
            dispatch({
                type: "SET_NAME",
                payload: name
            });
        }
    };
};

// Inorder to execute mapStateToProps, use the below function 'conenct() which connects reactjs with redux(i.e connect components here to the redux store )..Though we used Provider, we then also need to connect each component to the redux store

export default connect(mapStateToProps,mapDispatchToProps)(App); // This returns another function which we want to hook up?? The App component