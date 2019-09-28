import React from "react";
import MyCars from "../components/MyCars";
import MyTablets from "../components/MyTablets";
import {Switch,Route} from "react-router-dom";
import Dashboard from "../components/Dashboard";

class Routes extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' component={Dashboard} exact/>
                    <Route path='/my_cars' component={MyCars}/>
                    <Route path='/my_tablets' component={MyTablets}/>
                </Switch>
            </div>
        );
    }

}

export default Routes