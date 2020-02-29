import React, {Component} from 'react';
import {Card, CardHeader, Grid} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";

class CardheaderLoading extends Component {
    render() {
        return (
            <Grid item md={6} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                            title={
                                <Skeleton
                                    variant={"text"}
                                    width={150}
                                    height={20}
                                    style={{backgroundColor:grey[500]}}
                                />
                            }
                            avatar={
                                <Skeleton
                                    variant={"circle"}
                                    width={50}
                                    height={50}
                                    style={{backgroundColor:grey[500]}}
                                />
                            }
                            subheader={
                                <Skeleton
                                    variant={"text"}
                                    width={100}
                                    height={20}
                                    style={{backgroundColor:grey[500]}}
                                />
                            }
                        />
                    </Card>
                </Grid>
        );
    }
}

export default CardheaderLoading;