import React from 'react';
import {withStyles} from "@material-ui/core";
import {translate} from "react-i18next";
import {me} from "../../state/actions/usersActions";
import {connect} from "react-redux";
import CommonDashboards from "../../commons/CommonDashboards";
import drawerMenu from "../data/drawerMenu";

class AdvertisersDashboard extends  React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.me()
    }


    render() {
        return (
            <div>
                <CommonDashboards menu={drawerMenu}  addBar={false} type='Advertiser'/>
            </div>
        );
    }


}



export default connect(null,{me})(AdvertisersDashboard)
