import React from "react";
import dashboardStyle from "../styles/dashboardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {Container,Grid,Divider} from "@material-ui/core";
import AdvertiserCard from "./widgets/AdvertiserCard";
import {connect} from "react-redux";
import {me} from "../../state/actions/usersActions";
import AdvertiserCarAndMedia from "./widgets/AdvertiserCarAndMedia";
import DashboardAdverts from "./widgets/DashboardAdverts";
import NewsAndNotifications from "./widgets/NewsAndNotifications";
import TopAdvertedCompanies from "../../commons/components/TopAdvertedCompanies";

class Dashboard extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <AdvertiserCard/>
                <Divider style={{margin:20}}/>
                <Grid container spacing={2}>
                    <Grid item md={8} sm={12} xs={12}>
                        <DashboardAdverts/>
                        <AdvertiserCarAndMedia/>
                    </Grid>

                    <Grid item md={4} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <NewsAndNotifications/>
                            </Grid>

                            <Grid item md={12} xs={12} sm={12}>
                                <TopAdvertedCompanies/>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        );
    }


}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading
    }
)

export default connect(mapStateToProps,{me})(withStyles(dashboardStyle)(Dashboard))