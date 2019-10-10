import React from "react";
import Grid from "@material-ui/core/Grid";
import TotalAdverts from "./widgets/TotalAdverts";
import TotalAdvertedCompanies from "./widgets/TotalAdvertedMedia";
import TotalIncomes from "./widgets/TotalIncomes";
import Cars from "./widgets/Cars";
import dashboardStyle from "../style/dashboardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import TopAdvertedCompanies from "./widgets/TopAdvertedCompanies";
import CreditAndWithdrawal from "./widgets/CreditAndWithdrawal";
class Dashboard extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Grid container spacing={2} className={classes.cards}>
                    <Grid item md={3} sm={12}>
                       <TotalAdverts/>
                    </Grid>

                    <Grid item md={3} sm={12}>
                        <TotalAdvertedCompanies/>
                    </Grid>
                    <Grid item md={3} sm={12}>
                        <TotalIncomes/>
                    </Grid>

                    <Grid item md={3} sm={12}>
                        <CreditAndWithdrawal/>
                    </Grid>
                </Grid>


                <Grid container spacing={2} className={classes.status}>

                    <Grid item md={6} sm={12}>
                        <Cars show={false}/>
                    </Grid>

                    <Grid item md={6} sm={12}>
                        <TopAdvertedCompanies/>
                    </Grid>

                </Grid>
            </div>
        );
    }


}

export default withStyles(dashboardStyle)(Dashboard)