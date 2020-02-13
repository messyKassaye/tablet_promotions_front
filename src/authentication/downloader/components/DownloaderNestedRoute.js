import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import DownloadHome from "./DownloadHome";
import MyDownload from "./MyDownload";
import Setting from "../../commons/Setting";
import SetPlace from "./SetPlace";
class DownloaderNestedRoute extends Component {
    render() {
        return (
            <Switch>
                <Route path={'/auth'} component={DownloadHome} exact/>
                <Route path={'/auth/downloader/downloads'} component={MyDownload}/>
                <Route path={'/auth/downloader/settings'} component={Setting}/>
                <Route path={'/auth/downloader/set_place'} component={SetPlace}/>
            </Switch>
        );
    }
}

export default DownloaderNestedRoute;