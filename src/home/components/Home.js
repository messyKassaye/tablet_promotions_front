import React from 'react'
import { translate } from 'react-i18next';
import HeaderJumbotron from "./widgets/HeaderJumbotron";
import Whatistabletpromotion from "./widgets/Whatistabletpromotion";
import HowItWorks from "./widgets/HowItWorks";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "./styles/homeStyle";
import Categories from "./widgets/Categories";
import AdvertMedia from "./widgets/AdvertMedia";
import Footer from "./footer";
class Home extends React.Component{

    render() {
        const {classes,t} = this.props
        return <div>
            <HeaderJumbotron></HeaderJumbotron>
            <div className={classes.designed_for}>
                <span>{t('home.designed_for')}</span>
            </div>
            <Whatistabletpromotion/>
            <HowItWorks/>

            <Categories/>

            <AdvertMedia/>
        </div>
    }

}



export default withStyles(homeStyle)(translate('common')(Home))