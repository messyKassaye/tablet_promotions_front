import React, {Component} from 'react';
import {Card, CardContent, Grid,} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import advertViewInImageStyle from "../../style/advertViewInImageStyle";
import ViewImageCard from "../ViewImageCard";
class AdvertViewInImageCard extends Component {
    render() {
        const {classes} = this.props

        return (
            <Card elevation={0}>
                <CardContent>
                    <Grid container spacing={2}>
                        {
                            this.props.carAdvert.data.map(carAds=>(
                                <Grid key={carAds.id} item md={6} xs={12} sm={12}>
                                    <ViewImageCard carAds={carAds} action={true}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(advertViewInImageStyle)(AdvertViewInImageCard);