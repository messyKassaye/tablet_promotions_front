import React from "react";
import {translate} from 'react-i18next'
import {Container, Typography} from "@material-ui/core";
import what_is_tablet_promotion_style from '../../styles/what_is_tablet_promotion_style'
import withStyles from "@material-ui/core/styles/withStyles";
import SvgIcon from "@material-ui/core/SvgIcon";

const  style = {

}
 class  Whatistabletpromotion extends React.Component{
     constructor(props){
         super(props)
     }

     render() {
         const {classes} = this.props
         const {t} = this.props
         return (
             <Container maxWidth='md'>

                 <Typography component="h1" variant='h5' className={classes.title}>
                     {t('home.what_is_tablet_promotion.title')}
                 </Typography>
                 <Typography component='p' className={classes.descriptions}>
                     {t('home.what_is_tablet_promotion.description')}
                 </Typography>

                 <blockquote>
                     {
                         t('home.what_is_tablet_promotion.slogan')
                     }
                 </blockquote>
                 <Typography component='p' className={classes.descriptions}>
                     {t('home.what_is_tablet_promotion.description_3')}
                 </Typography>
             </Container>
         )
     }

 }

export default withStyles(what_is_tablet_promotion_style)(translate('common')(Whatistabletpromotion))