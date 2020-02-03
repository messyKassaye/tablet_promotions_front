import {Card, CardContent, Container} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import pricingStyle from "./styles/pricingStyle";
import {translate} from "react-i18next";
import React, {Component} from 'react';

class Pricing extends Component {
    render() {
        const {classes,t} = this.props
        return (
            <div>
                <div className={classes.jumbotron}>
                    <h1>{t('home.pricing.pricing_message')}</h1>
                </div>
                <Container maxWidth={"lg"} className={classes.card}>
                    <Card>
                        <CardContent>

                        </CardContent>
                    </Card>

                </Container>
            </div>
        );
    }
}


export default withStyles(pricingStyle)(translate('common')(Pricing))