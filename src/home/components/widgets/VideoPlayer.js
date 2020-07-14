import React, {Component} from 'react';
import {Card, CardContent, Container} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import videoPlayerStyle from "../styles/videoPlayerStyle";
class VideoPlayer extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>

            </div>
        );
    }
}

export default withStyles(videoPlayerStyle)(VideoPlayer);