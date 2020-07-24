import React, {Component} from 'react';
import {connect} from "react-redux";
import {setPlace} from "../state/action/AddressAction";
import {Card, CardContent, Container, CardHeader, Typography, Avatar} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {green} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import downloadHomeStyle from "./styles/downloadHome";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import BusinessIcon from '@material-ui/icons/Business';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import Grid from "@material-ui/core/Grid";
import TotalAdverts from "../../carOwners/components/widgets/TotalAdverts";
import TotalAdvertedMedia from "../../carOwners/components/widgets/TotalAdvertedMedia";
import TotalIncomes from "../../carOwners/components/widgets/TotalIncomes";
import PaymentAndWithdrawal from "../../carOwners/components/widgets/PaymentAndWithdrawal";
import Cars from "../../carOwners/components/widgets/Cars";
import DriverCar from "./DriverCar";
import AdvertisedCompanies from "./AdvertisedCompanies";
import AllAdverts from "../../commons/components/AllAdverts";
class DownloadHome extends Component {
    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Grid container spacing={2} className={classes.cards}>
                    <Grid item md={3} xs={12} sm={12}>
                        <TotalAdverts/>
                    </Grid>

                    <Grid item md={3} xs={12} sm={12}>
                        <TotalAdvertedMedia/>
                    </Grid>
                    <Grid item md={3} xs={12} sm={12}>
                        <TotalIncomes/>
                    </Grid>

                    <Grid item md={3} xs={12} sm={12}>
                        <PaymentAndWithdrawal/>
                    </Grid>

                    <Grid item md={12} lg={12} xs={12} sm={12}>
                        <DriverCar/>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item md={12} xs={12} sm={12}>
                        <AllAdverts/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading
})

export default connect(mapStateToProps,{setPlace})(withStyles(downloadHomeStyle)(DownloadHome));