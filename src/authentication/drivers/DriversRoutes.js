import React from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import DriversDashboard from "./components/DriversDashboad";

const DriverRoute = ()=>{
    return (
        <Router>
            <Switch>
                <Route  path='/' component={DriversDashboard}/>
            </Switch>
        </Router>
    )
}

export default DriverRoute