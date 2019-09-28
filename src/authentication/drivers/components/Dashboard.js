import React from "react";
import Grid from "@material-ui/core/Grid";
import theme from "../../../themes/app_theme";
import TotalAdverts from "./widgets/TotalAdverts";
import TotalAdvertedCompanies from "./widgets/TotalAdvertedMedia";
import TotalIncomes from "./widgets/TotalIncomes";
import Financings from "./widgets/Financings";
class Dashboard extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Grid container spacing={2} style={{paddingTop:20}}>
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
                        <Financings/>
                    </Grid>
                </Grid>
            </div>
        );
    }


}

export default Dashboard