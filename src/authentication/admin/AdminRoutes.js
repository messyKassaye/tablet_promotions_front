import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AdminHome from "./components/AdminHome";

const AdminRoutes =()=>{

    return (
        <Router>
            <Switch>
                <Route path='/auth' component={AdminDashboard}/>
            </Switch>
        </Router>
    )
}

export default AdminRoutes
