import React from "react";
import dashboardStyle from "../styles/dashboardStyle";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import MyAdverts from "./MyAdverts";
class Dashboard extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <Grid container spacing={2}>
               <Grid item md={12} xs={12}>
                   <MyAdverts/>
               </Grid>
            </Grid>
        );
    }


}

export default withStyles(dashboardStyle)(Dashboard)