import React from "react";
import MyCompanies from "./MyCompanies";
import {Route,Switch,useParams} from 'react-router-dom'
import Dashboard from "./Dashboard";
import MyAdverts from "./MyAdverts";
import NewCompany from "./NewCompany";
import Setting from "../../commons/Setting";
import NotificationDetails from "../../commons/components/NotificationDetails";
import AdvertViewsProfile from "../../commons/components/AdvertViewsProfile";
import AdvertProfile from "../../commons/components/AdvertProfile";
class AdvertiserNestedRoute extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/auth' component={Dashboard} exact/>
                    <Route path='/auth/advertiser/myCompanies' component={MyCompanies}/>
                    <Route path='/auth/advertiser/myAdverts' component={MyAdverts}/>
                    <Route path={'/auth/advertiser/advert/:id'} component={AdvertProfile}/>
                    <Route path={'/auth/advertiser/advertViews/:id'} component={AdvertViewsProfile}/>
                    <Route path='/auth/advertiser/companyRegistration' component={NewCompany}/>
                    <Route path='/auth/advertiser/notifications' component={NotificationDetails}/>
                    <Route path='/auth/advertiser/settings' component={Setting}/>
                </Switch>
            </div>
        );
    }


}

export default AdvertiserNestedRoute
