import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminBanks from "./AdminBanks";
import Role from "./Role";
import AdminCars from "./AdminCars";
import AdvertMedias from "./AdvertMedias";
import AdminAdverts from "./AdminAdverts";
import Setting from "../../commons/Setting";
import AdminUsers from "./AdminUsers";
import NotificationDetails from "../../commons/components/NotificationDetails";
import Currency from "./Currency";
import Places from "./Places";
import AdvertViewPayment from "../../commons/AdvertViewPayment";
import WithdrawalRequest from "./WithdrawalRequest";
import PayedWithdrawRequest from "./PayedWithdrawRequest";
import Adverts from "../../commons/components/Adverts";
import UserProfile from "../../commons/components/UserProfile";

class AdminNestedRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path='/auth' component={AdminHome} exact/>
                <Route path='/auth/admin/users' component={AdminUsers}/>
                <Route path='/auth/admin/user/:id' component={UserProfile}/>

                <Route path={'/auth/admin/adverts'} component={AdminAdverts}/>
                <Route path={'/auth/admin/advert/:id'} component={Adverts}/>

                <Route path='/auth/admin/banks' component={AdminBanks}/>
                <Route path='/auth/admin/currency' component={Currency}/>
                <Route path='/auth/admin/roles' component={Role}/>
                <Route path='/auth/admin/places' component={Places}/>
                <Route path='/auth/admin/cars' component={AdminCars}/>
                <Route path='/auth/admin/medias' component={AdvertMedias}/>
                <Route path='/auth/admin/notifications' component={NotificationDetails}/>
                <Route path='/auth/admin/settings' component={Setting}/>
                <Route path={'/auth/admin/my_payment'} component={AdvertViewPayment}/>
                <Route path={'/auth/admin/withdrawal_request'} component={WithdrawalRequest}/>
                <Route path={'/auth/admin/approved_withdraw_request'} component={PayedWithdrawRequest}/>
            </Switch>
        );
    }
}

export default AdminNestedRoute;
