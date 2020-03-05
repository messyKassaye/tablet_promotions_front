import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Grid, Button, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import tabAdvertsDescriptionStyle from "../../styles/tabAdvertDescription";
import {translate} from "react-i18next";
class TabAdvertsDescription extends Component {
    render() {
        const {classes,t} = this.props
        return (
            <Grid container spacing={2}>

                    <Grid item md={9} xs={12} sm={12}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    {t('advertiser.description.title')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item md={3} xs={12} sm={12}>
                        <Card className={classes.smallCard}>
                            <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <Button
                                    color={"primary"}
                                    variant={"contained"}
                                >
                                    {t('advertiser.description.start_adverting')}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
        );
    }
}

export default translate('common')
(withStyles(tabAdvertsDescriptionStyle)(TabAdvertsDescription));