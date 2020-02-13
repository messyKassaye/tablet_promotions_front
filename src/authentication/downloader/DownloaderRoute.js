import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import DownloaderDashboard from "./components/DownloaderDashboard";

const DownloaderRoute = ()=>{
    return <Router>
        <Switch>
            <Route path={'/auth'} component={DownloaderDashboard}/>
        </Switch>
    </Router>
}

export default DownloaderRoute