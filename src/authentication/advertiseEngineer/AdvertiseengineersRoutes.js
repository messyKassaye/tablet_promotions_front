import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import AdvertiserEngineersDashboard from "./component/AdvertiserEngineersDashboard";

const AdvertiseengineersRoutes = ()=>{
    return (
        <Router>
            <Switch>
                <Route path='/' component={AdvertiserEngineersDashboard()}/>
            </Switch>
        </Router>
    )
}

export default AdvertiseengineersRoutes