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
                    <Route path='/' component={Dashboard} exact/>
                    <Route path='/my_cars' component={MyCars}/>
                    <Route path='/my_tablets' component={MyTablets}/>
                    <Route path='/settings' component={Setting}/>
                    <Route path='/finance' component={Finances}/>
                    <Route path='/adverts' component={Adverts}/>
                    <Route path='/ekub' component={Ekub}/>
                </Switch>
            </div>
        );
    }

}

export default Routes