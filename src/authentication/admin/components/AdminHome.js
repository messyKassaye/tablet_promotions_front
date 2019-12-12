import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import AdminCard from "./widgets/AdminCard";
import {green} from "@material-ui/core/colors";

class AdminHome extends Component {
    render() {
        return (
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <AdminCard content={[{name:'Drivers',value:200},{name:'Advertisers',value:200}]} type='users' backgroundColor={green[500]} title={'Total users'} route={'/auth/admin/users'}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default AdminHome;
