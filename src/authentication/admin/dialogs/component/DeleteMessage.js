import React, {Component} from 'react';
import {Typography} from "@material-ui/core";

class DeleteMessage extends Component {
    render() {
        return (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography>{this.props.message}</Typography>
            </div>
        );
    }
}
export default DeleteMessage;
