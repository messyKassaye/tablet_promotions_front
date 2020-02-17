import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import AdminCard from "./widgets/AdminCard";
import {deepOrange, deepPurple, green} from "@material-ui/core/colors";
import CommonDashboardCard from "../../commons/components/CommonDashboardCard";

class AdminHome extends Component {
    render() {
        return (
            <Container maxWidth='lg'>
                <Grid container spacing={2}>

                    <Grid item md={3} xs={12}>
                        <CommonDashboardCard
                            chartBackgroundColor={deepOrange[500]}
                            cardBackgroundColor={green[500]}
                            textColor={'white'}
                            title={'23K'}
                            subheader={'Total users'}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <CommonDashboardCard
                            chartBackgroundColor={green[500]}
                            cardBackgroundColor={'#3C4252'}
                            textColor={'white'}
                            title={'23K'}
                            subheader={'Total adverts'}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <CommonDashboardCard
                            chartBackgroundColor={deepPurple[500]}
                            cardBackgroundColor={deepOrange[500]}
                            textColor={'white'}
                            title={'23K'}
                            subheader={'Total advert deposit'}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <CommonDashboardCard
                            chartBackgroundColor={deepPurple[500]}
                            cardBackgroundColor={deepOrange[500]}
                            textColor={'white'}
                            title={'23K'}
                            subheader={'Total advert deposit'}
                        />
                    </Grid>

                </Grid>
            </Container>
        );
    }
}

export default AdminHome;
