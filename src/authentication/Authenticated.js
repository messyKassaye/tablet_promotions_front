import React, {Suspense} from "react";
import {getRole} from "../TokenService";
import Loading from "../helpers/Loading";
import {BrowserRouter as Router} from "react-router-dom";
import RegisterCarsDialog from "./drivers/dialogs/registerCarsDialog";
import BankRegistrationDialog from "./drivers/dialogs/bankRegistrationDialog";
import WithdrawalRequestDialog from "./drivers/dialogs/withdrawalRequestDialog";
import AdvertPaymentConfirmDialog from "./advertisers/dialogs/advertPaymentConfirmdialog";
import DeleteAdvertDialog from "./advertisers/dialogs/deleteAdvertConfirmDialog";
import MainDialog from "./admin/dialogs/MainDialog";

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
            Component = React.lazy(()=> import("./downloader/DownloaderRoute"))
        }else if(roleId===1){
            Component = React.lazy(()=>import("./admin/AdminRoutes"))
        }
        return (
            <Suspense fallback={<Loading/>}>
                <RegisterCarsDialog/>
                <BankRegistrationDialog/>
                <WithdrawalRequestDialog/>
                <AdvertPaymentConfirmDialog/>
                <MainDialog/>
                <DeleteAdvertDialog/>
                <Router>
                    <Component/>
                </Router>
            </Suspense>
        )
    }
}

export default Authenticated
