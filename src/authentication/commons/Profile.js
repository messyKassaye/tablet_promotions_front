import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import authstyle from "../auth_style";
import Badge from '@material-ui/core/Badge';
import withStyles from "@material-ui/core/styles/withStyles";
class Profile  extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const  classes = this.props
        return (
            <div>
                <IconButton color='inherit'>
                    <Avatar style={{margin:1,width:25,height:25}}>M</Avatar>
                </IconButton>
            </div>
        );
    }

}

export default withStyles(authstyle)(Profile)