import React from "react";
import {BrowserRouter as Router,Route,Switch,Redirect,withRouter} from "react-router-dom";
import DriversDashboard from "./components/DriversDashboad";

class  DriverRoute extends React.Component{
    constructor(props) {
        super(props);

    }



    render() {
        return  (
            <Router>
                <Switch>
                    <Route  path='/' component={DriversDashboard}/>
                </Switch>
            </Router>
        )
    }


}

export default withRouter(DriverRoute)