import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminBanks from "./AdminBanks";
import Role from "./Role";

class AdminNestedRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path='/auth' component={AdminHome} exact/>
                <Route path='/auth/admin/banks' component={AdminBanks}/>
                <Route path='/auth/admin/roles' component={Role}/>
            </Switch>
        );
    }
}

export default AdminNestedRoute;
