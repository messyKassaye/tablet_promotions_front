import React from 'react'
import { translate } from 'react-i18next';
import HeaderJumbotron from "./widgets/HeaderJumbotron";
import {Card, CardContent, Container, Typography} from "@material-ui/core";
import useStyles from "../../styles/app_style";
import Whatistabletpromotion from "./widgets/Whatistabletpromotion";
import HowItWorks from "./widgets/HowItWorks";
import VideoAndImages from "./widgets/VideoAndImages";
const Home = ({t}) => {
    const  classes = useStyles()
  return (
    <div>
      <HeaderJumbotron></HeaderJumbotron>
        <div className={classes.designed_for}>
            <span>{t('home.designed_for')}</span>
        </div>
        <Whatistabletpromotion/>
        <HowItWorks/>
    </div>
  )
}

export default translate('common')(Home)