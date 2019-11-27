import React from 'react';
import {me} from "../../state/actions/usersActions";
import {connect} from "react-redux";
import CommonDashboards from "../../commons/CommonDashboards";
import drawerMenu from "../data/drawerMenu";
const drawerWidth = 240;

class AdminDashboard extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.me()
    }

    render() {
        return (
            <div>
                <CommonDashboards menu={drawerMenu}  addBar={false} type='Admin'/>
            </div>
        );
    }


}
export default connect(null,{me})(AdminDashboard);
