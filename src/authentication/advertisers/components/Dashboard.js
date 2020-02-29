import React from "react";
import dashboardStyle from "../styles/dashboardStyle";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import MyAdverts from "./MyAdverts";
import {Card, CardContent, Container} from "@material-ui/core";
import {deepOrange, green} from "@material-ui/core/colors";
class Dashboard extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"md"}>
                <Grid container spacing={2}>

                    <Grid item md={6} xs={12} sm={12}>
                        <Card style={{backgroundColor:deepOrange[500],color:'white'}}>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item md={6} xs={12} sm={12}>
                        <Card style={{backgroundColor:green[500],color:'white'}}>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        );
    }


}

export default withStyles(dashboardStyle)(Dashboard)