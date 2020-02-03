import React from "react";
import {translate} from 'react-i18next'
import {Card, CardContent, CardHeader, Container, Typography} from "@material-ui/core";
import what_is_tablet_promotion_style from '../../styles/what_is_tablet_promotion_style'
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import {green} from "@material-ui/core/colors";
import { Fade } from 'react-slideshow-image';
import taxi from '../../../assets/taxi.jpg'
import lada from '../../../assets/lada.png'
 class  Whatistabletpromotion extends React.Component{
     constructor(props){
         super(props)
     }

     render() {
         const {classes} = this.props
         const {t} = this.props
         return (
             <Container maxWidth='lg'>
                 <Grid container spacing={2}>

                     <Grid item md={9} xs={12} sm={12}>
                         <Card>
                             <CardContent>
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
                             </CardContent>
                         </Card>
                     </Grid>

                     <Grid item md={3} xs={12} sm={12} className={classes.small_card}>
                         <Card style={{
                             backgroundImage:`url('${lada}')`,
                             backgroundRepeat:"no-repeat",
                             backgroundSize:"cover",
                             backgroundColor:green[500],
                             height:215}}>
                         </Card>
                     </Grid>
                 </Grid>
             </Container>
         )
     }

 }

export default withStyles(what_is_tablet_promotion_style)(translate('common')(Whatistabletpromotion))