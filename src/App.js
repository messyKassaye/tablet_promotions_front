import React from 'react';
import HomeBar from './home/components/HomeBar'
import {BrowserRouter as Router,Switch} from 'react-router-dom'
import AuthenticationService from "./authenticationService";
import PrivateRoute from "./routes/PrivateRoute";
import authenticationReducer from "./state/reducers/authenticationReducer";
import Authenticated from "./authentication/Authenticated";
function App() {
  return (
    <Router>
        <PrivateRoute component={Authenticated}/>
    </Router>
  );
}

export default App;
