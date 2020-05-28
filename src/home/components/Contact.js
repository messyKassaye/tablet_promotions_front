import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import contactStyle from "./styles/contactstyle";
import {translate} from "react-i18next";
import {Card, CardContent, Container} from "@material-ui/core";
class Contact extends Component {
    render() {
        const {classes,t} = this.props
        return (
            <div>
                <div className={classes.jumbotron}>
                    <h1>{t('home.contact_us.contact_message')}</h1>
                </div>

                <Container maxWidth={"md"}>
                    <Card className={classes.card}>
                        <CardContent>

                        </CardContent>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default translate('common')(withStyles(contactStyle)(Contact))