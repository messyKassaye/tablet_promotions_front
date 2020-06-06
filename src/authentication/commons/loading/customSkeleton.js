import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
class FourByFourSkeleton extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <Skeleton variant='rect' width={'100%'} height={200} style={{backgroundColor:grey[500]}}/>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Skeleton variant='rect' width={'100%'} height={200} style={{backgroundColor:grey[500]}}/>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Skeleton variant='rect' width={'100%'} height={200} style={{backgroundColor:grey[500]}}/>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Skeleton variant='rect' width={'100%'} height={200} style={{backgroundColor:grey[500]}}/>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Skeleton variant='rect' width={'100%'} height={200} style={{backgroundColor:grey[500]}}/>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Skeleton variant='rect' width={'100%'} height={200} style={{backgroundColor:grey[500]}}/>
                </Grid>

            </Grid>
        );
    }


}

export default FourByFourSkeleton