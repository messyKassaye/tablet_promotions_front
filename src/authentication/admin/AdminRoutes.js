import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";

const AdminRoutes =()=>{

    return (
        <Router>
            <Switch>
                <Route path='/' component={AdminDashboard()}/>
            </Switch>
        </Router>
    )
}

export default AdminRoutes