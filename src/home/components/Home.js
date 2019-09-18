import React from 'react'
import { translate } from 'react-i18next';
import HeaderJumbotron from "./widgets/HeaderJumbotron";
import {Card, CardContent, Container, Typography} from "@material-ui/core";
import useStyles from "../../styles/app_style";
const Home = ({t}) => {
    const  classes = useStyles()
  return (
    <div>
      <HeaderJumbotron></HeaderJumbotron>
        <div className={classes.designed_for}>
            <span>{t('home.designed_for')}</span>
        </div>

        <Container fixed>
            <Card>
                <CardContent>
                    <Typography component="h2" variant='h5' color='textPrimary'>What is Tablet promotion</Typography>
                </CardContent>
            </Card>
        </Container>
    </div>
  )
}

export default translate('common')(Home)