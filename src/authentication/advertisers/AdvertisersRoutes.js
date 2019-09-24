import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import AdvertisersDashboard from "./components/AdvertisersDashboard";
const AdvertisersRoutes = ()=>{
    return (
        <Router>
            <Switch>
                <Route path='/' component={AdvertisersDashboard}/>
            </Switch>
        </Router>
    )
}
export default AdvertisersRoutes