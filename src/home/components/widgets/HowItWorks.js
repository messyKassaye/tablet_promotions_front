import React from "react";
import {Container, Typography} from "@material-ui/core";
import {translate} from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
import what_is_tablet_promotion_style from '../../styles/what_is_tablet_promotion_style'
class HowItWorks extends React.Component{

    render() {
        const {t} = this.props
        const {classes} = this.props
        return (
            <Container maxWidth='md' style={{marginTop:20}}>
                <Typography component="h1" variant='h5' className={classes.title}>
                    {t('home.how_it_works.title')}
                </Typography>
            </Container>
        )
    }
}

export default withStyles(what_is_tablet_promotion_style())(translate('common')(HowItWorks))