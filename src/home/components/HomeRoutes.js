import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Pricing from "./Pricing";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./widgets/ResetPassword";
import NotFound from "../../errors/NotFound";

class HomeRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
                <Route path='/pricing' component={Pricing}/>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Route path={'/reset_password'} component={ResetPassword}/>
                <Route path='*' component={NotFound}/>
            </Switch>
        );
    }
}

export default HomeRoutes;