import React, {Component} from 'react';
import CommonDashboards from "../../commons/CommonDashboards";
import drawerMenu from "../data/downloaderMenu";
import {connect} from "react-redux";
import {me} from "../../state/actions/usersActions";

class DownloaderDashboard extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.me()
    }

    render() {
        return (
            <div>
                <CommonDashboards menu={drawerMenu}  addBar={false} type='Down loader'/>
            </div>
        );
    }


}
export default connect(null,{me})(DownloaderDashboard);
