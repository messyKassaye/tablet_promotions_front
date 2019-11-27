import React from "react";
import MyCars from "../components/MyCars";
import MyTablets from "../components/MyTablets";
import {Switch,Route} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Setting from "../../commons/Setting";
import Finances from "../components/Finances";
import Adverts from "../components/widgets/Adverts";
import {Redirect} from 'react-router-dom'
import Ekub from "../components/Ekub";
class Routes extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        return <Redirect to='/'  push={true}/>
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/auth' component={Dashboard} exact/>
                    <Route path='/auth/my_cars' component={MyCars}/>
                    <Route path='/auth/my_tablets' component={MyTablets}/>
                    <Route path='/auth/settings' component={Setting}/>
                    <Route path='/auth/finance' component={Finances}/>
                    <Route path='/auth/adverts' component={Adverts}/>
                    <Route path='/auth/ekub' component={Ekub}/>
                </Switch>
            </div>
        );
    }

}

export default Routes
