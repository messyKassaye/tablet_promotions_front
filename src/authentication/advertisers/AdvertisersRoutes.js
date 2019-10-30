import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import AdvertisersDashboard from "./components/AdvertisersDashboard";
import Dashboard from "./components/Dashboard";
const AdvertisersRoutes = ()=>{
    return (
        <Router>
            <Switch>
                <Route path='/' component={AdvertisersDashboard}/>
                <Route path='/dashboard' component={Dashboard} exact/>
            </Switch>
        </Router>
    )
}
export default AdvertisersRoutes