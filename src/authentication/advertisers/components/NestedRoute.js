import React from "react";
import MyCompanies from "./MyCompanies";
import {Route,Switch} from 'react-router-dom'
import Dashboard from "./Dashboard";
import MyAdverts from "./MyAdverts";
import NewAderts from "./NewAderts";
import BankTransactions from "./widgets/bankTransactions";
class NestedRoute extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{padding:20}}>
                <Switch>
                    <Route path='/' component={Dashboard} exact/>
                    <Route path='/my_companies' component={MyCompanies}/>
                    <Route path='/my_adverts' component={MyAdverts}/>
                    <Route path='/new_adverts' component={NewAderts}/>
                    <Route path='/bank_transaction' component={BankTransactions}/>
                    <Route path='/my_adverts' component={MyAdverts}/>
                </Switch>
            </div>
        );
    }


}

export default NestedRoute