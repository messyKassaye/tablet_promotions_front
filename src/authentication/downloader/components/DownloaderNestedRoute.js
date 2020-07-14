import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import DownloadHome from "./DownloadHome";
import MyDownload from "./MyDownload";
import Setting from "../../commons/Setting";
import SetPlace from "./SetPlace";
import Finances from "../../carOwners/components/Finances";
import AllAdverts from "../../commons/components/AllAdverts";
class DownloaderNestedRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path={'/auth'} component={DownloadHome} exact/>
                <Route path={'/auth/driver/my_adverts'} component={AllAdverts}/>
                <Route path={'/auth/driver/finances'} component={Finances}/>
                <Route path={'/auth/driver/settings'} component={Setting}/>
                <Route path={'/auth/downloader/set_place'} component={SetPlace}/>
            </Switch>
        );
    }
}

export default DownloaderNestedRoute;