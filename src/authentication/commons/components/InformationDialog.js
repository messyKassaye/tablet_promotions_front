import React, {Component} from 'react';
import {Typography} from "@material-ui/core";

class InformationDialog extends Component {
    render() {
        return (
            <div>
                <Typography>
                    {this.props.information}
                </Typography>
            </div>
        );
    }
}

export default InformationDialog;