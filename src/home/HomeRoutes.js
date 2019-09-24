import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomeBar from "./components/HomeBar";

const HomeRoutes = ()=>{

    return (
        <Router>
            <Switch>
                <Route path='/' component={HomeBar}/>
            </Switch>
        </Router>
    )
}

export default HomeRoutes