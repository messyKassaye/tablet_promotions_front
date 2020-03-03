import React from "react";
import dashboardStyle from "../styles/dashboardStyle";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import MyAdverts from "./MyAdverts";
import {Card, CardContent, Container} from "@material-ui/core";
import {deepOrange, green} from "@material-ui/core/colors";
import TabAdvertsDescription from "./widgets/TabAdvertsDescription";
class Dashboard extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"md"}>
                <TabAdvertsDescription/>
            </Container>
        );
    }


}

export default withStyles(dashboardStyle)(Dashboard)