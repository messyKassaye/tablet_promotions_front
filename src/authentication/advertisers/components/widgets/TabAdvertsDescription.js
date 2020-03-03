import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Grid, Button, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

class TabAdvertsDescription extends Component {
    render() {
        return (
            <Grid container spacing={2}>

                    <Grid item md={9} xs={12} sm={12}>
                        <Card>
                            <CardContent>
                                <Typography>

                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item md={3} xs={12} sm={12}>
                        <Card>
                            <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <Button
                                    color={"primary"}
                                    variant={"contained"}
                                >
                                    Start adverting
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
        );
    }
}

export default TabAdvertsDescription;