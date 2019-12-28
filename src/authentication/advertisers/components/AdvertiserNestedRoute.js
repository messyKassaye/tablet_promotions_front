import React from "react";
import MyCompanies from "./MyCompanies";
import {Route,Switch} from 'react-router-dom'
import Dashboard from "./Dashboard";
import MyAdverts from "./MyAdverts";
import NewAderts from "./NewAderts";
import BankTransactions from "./widgets/bankTransactions";
import NewCompany from "./NewCompany";
import Setting from "../../commons/Setting";
import NotificationDetails from "../../commons/components/NotificationDetails";
class AdvertiserNestedRoute extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{padding:20}}>
                <Switch>
                    <Route path='/' component={Dashboard} exact/>
                    <Route path='/auth/advertiser/myCompanies' component={MyCompanies}/>
                    <Route path='/auth/advertiser/myAdverts' component={MyAdverts}/>
                    <Route path='/auth/advertiser/newAdverts' component={NewAderts}/>
                    <Route path='/auth/advertiser/companyRegistration' component={NewCompany}/>
                    <Route path='/auth/advertiser/notifications' component={NotificationDetails}/>
                    <Route path='/auth/advertiser/settings' component={Setting}/>
                </Switch>
            </div>
        );
    }


}

export default AdvertiserNestedRoute
