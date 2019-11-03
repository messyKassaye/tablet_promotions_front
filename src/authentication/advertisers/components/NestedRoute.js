import React from "react";
import MyCompanies from "./MyCompanies";
import {Route,Switch} from 'react-router-dom'
import Dashboard from "./Dashboard";
import MyAdverts from "./MyAdverts";
import NewAderts from "./NewAderts";
import BankTransactions from "./widgets/bankTransactions";
import NewCompany from "./NewCompany";
class NestedRoute extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{padding:20}}>
                <Switch>
                    <Route path='/' component={Dashboard} exact/>
                    <Route path='/myCompanies' component={MyCompanies}/>
                    <Route path='/myAdverts' component={MyAdverts}/>
                    <Route path='/newAdverts' component={NewAderts}/>
                    <Route path='/bankTransaction/:id' component={BankTransactions}/>
                    <Route path='/companyRegistration' component={NewCompany}/>
                </Switch>
            </div>
        );
    }


}

export default NestedRoute