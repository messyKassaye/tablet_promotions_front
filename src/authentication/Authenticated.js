import React, {Suspense} from "react";
import {getRole} from "../TokenService";
import Loading from "../helpers/Loading";
import {BrowserRouter as Router} from "react-router-dom";
let Component = null
class Authenticated extends React.Component{

    constructor(props){
        super(props)
    }


    render() {
        const roleId = JSON.parse(getRole()).id
        if(roleId===2){
            Component = React.lazy(()=> import("./drivers/DriversRoutes"))
        }else if(roleId===3){
            Component = React.lazy(()=> import("./advertisers/AdvertisersRoutes"))
        }else if(roleId===4){
            Component = React.lazy(()=> import("./advertiseEngineer/AdvertiseengineersRoutes"))
        }else {
            Component = React.lazy(()=>import("./admin/AdminRoutes"))
        }
        return (
            <Suspense fallback={<Loading/>}>
                <Router>
                    <Component {...this.props}/>
                </Router>
            </Suspense>
        )
    }
}

export default Authenticated