import React from "react";
import {translate} from "react-i18next";
import useStyles from "../../../styles/app_style";
import Slider from "./Slider";
const HeaderJumbotron = ({t}) =>{
    const  classes = useStyles()
    return (
        <div className={classes.jumbotron}>

            <Slider slide_data='advertiser'></Slider>
        </div>
    )
}

export  default translate('common')(HeaderJumbotron)
