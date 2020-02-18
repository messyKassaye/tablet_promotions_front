import React, {Component} from 'react';
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import {Grid} from "@material-ui/core";

class SingleLoading extends Component {
    render() {
        return (
            <Grid item md={this.props.md} xs={12} sm={12}>
                <Skeleton variant={"rect"} width={'100%'} height={this.props.height} style={{backgroundColor:grey[500]}}/>
            </Grid>
        );
    }
}

export default SingleLoading;