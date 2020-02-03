import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import aboutStyle from "./styles/aboutStyle";
import {translate} from "react-i18next";
import {Card, CardContent, Container} from "@material-ui/core";
class About extends React.Component{

    render() {
        const {classes,t} = this.props
        return (
            <div>
                <div className={classes.jumbotron}>
                    <h1>{t('home.about_us.about_message')}</h1>
                </div>
                <Container maxWidth={"lg"} className={classes.card}>
                    <Card>
                        <CardContent>

                        </CardContent>
                    </Card>

                </Container>
            </div>
        )
    }
}

export default translate('common')(withStyles(aboutStyle)(About))