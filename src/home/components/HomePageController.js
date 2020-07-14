import React, {Component, Suspense} from 'react';
import Loading from "../../helpers/Loading";
import HomeBar from "./HomeBar";
import HomeDialog from "./HomeDialog";

class HomePageController extends Component {
    render() {
        return (
            <Suspense fallback={<Loading/>}>
                <HomeDialog/>
                <HomeBar/>
            </Suspense>
        );
    }
}

export default HomePageController;