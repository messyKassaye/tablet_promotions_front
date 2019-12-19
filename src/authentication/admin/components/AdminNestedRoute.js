import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminBanks from "./AdminBanks";
import Role from "./Role";
import AdminCars from "./AdminCars";
import AdvertMedias from "./AdvertMedias";
import AdminAdverts from "./AdminAdverts";

class AdminNestedRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path='/auth' component={AdminHome} exact/>
                <Route path={'/auth/admin/adverts'} component={AdminAdverts}/>
                <Route path='/auth/admin/banks' component={AdminBanks}/>
                <Route path='/auth/admin/roles' component={Role}/>
                <Route path='/auth/admin/cars' component={AdminCars}/>
                <Route path='/auth/admin/medias' component={AdvertMedias}/>
            </Switch>
        );
    }
}

export default AdminNestedRoute;
