import React from "react";
import dashboardStyle from "../styles/dashboardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {Container,Grid} from "@material-ui/core";
import TabAdvertsDescription from "./widgets/TabAdvertsDescription";
import AdvertiserCard from "./widgets/AdvertiserCard";
import {connect} from "react-redux";
import {me} from "../../state/actions/usersActions";
import AdvertiserCarAndMedia from "./widgets/AdvertiserCarAndMedia";
class Dashboard extends React.Component{

    constructor(props) {
        super(props);

    }


    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <AdvertiserCard/>
                <TabAdvertsDescription/>
                <AdvertiserCarAndMedia/>
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