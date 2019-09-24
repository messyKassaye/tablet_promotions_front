import React from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import DriversDashboard from "./components/DriversDashboadr";
import NotFound from "../../errors/NotFound";

const DriverRoute = ()=>{
    return (
        <Router>
            <Switch>
                <Route  path='/' component={DriversDashboard} name='drivers'/>
                <Route path='*' component={NotFound}/>
            </Switch>
        </Router>
    )
}

export default DriverRoute