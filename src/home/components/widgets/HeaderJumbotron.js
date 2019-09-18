import React from "react";
import {translate} from "react-i18next";
import Button from "@material-ui/core/Button";
import useStyles from "../../../styles/app_style";
import Slider from "./Slider";
import {Link} from "react-router-dom";
const HeaderJumbotron = ({t}) =>{
    const  classes = useStyles()
    return (
        <div className={classes.jumbotron}>

            <Slider slide_data='advertiser'/>
            <Button component={Link} to='/signup'  variant='outlined' color='inherit'>
                {t('home.start_button')}
            </Button>
        </div>
    )
}

export  default translate('common')(HeaderJumbotron)