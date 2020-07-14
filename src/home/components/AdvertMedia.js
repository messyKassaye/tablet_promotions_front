import React, {Component} from 'react';
import {Card,Grid ,CardContent, Container, CardHeader,
    Avatar,Typography,Divider} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import contactStyle from "./styles/contactstyle";
import {translate} from "react-i18next";
import {fetchAdvertMedia} from "../state/action/advertMediaAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
class AdvertMedia extends Component {

    componentDidMount() {
        this.props.fetchAdvertMedia()
    }

    render() {
        const {classes,t} = this.props
        return (
            <div>
                <div className={classes.jumbotron}>
                    <h1>{t('home.advert_medias.advert_medias_message')}</h1>
                </div>
                <Container maxWidth={"md"} className={classes.card}>
                   <div className={classes.advertMediaBox}>
                       {
                           this.props.loading
                               ?
                               (
                                   <Grid container spacing={2}>
                                       <Grid item md={12} xs={12}>
                                           <Skeleton variant={"rect"} width={'100%'} height={200}/>
                                       </Grid>
                                       <Grid item md={12} xs={12}>
                                           <Skeleton variant={"rect"} width={'100%'} height={200}/>
                                       </Grid>
                                       <Grid item md={12} xs={12}>
                                           <Skeleton variant={"rect"} width={'100%'} height={200}/>
                                       </Grid>
                                   </Grid>
                               )
                               :
                               (
                                   <Grid container spacing={2}>
                                       {
                                           this.props.medias.map(medias=>(
                                               <Grid key={medias.id} item md={12} xs={12}>
                                                   <Card>
                                                       <CardHeader
                                                           title={medias.name}
                                                           subheader={`per view payment: ${medias.per_view_payment} ETB`}
                                                           avatar={<Avatar>{medias.name.charAt(0)}</Avatar>}/>
                                                       <Divider/>
                                                       <CardContent>
                                                           <Typography>{medias.description}</Typography>
                                                       </CardContent>
                                                   </Card>
                                               </Grid>
                                           ))
                                       }
                                   </Grid>
                               )
                       }
                   </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state=>({
    medias:state.homeReducer.mediaReducer.medias,
    loading:state.homeReducer.mediaReducer.loading
})

export default connect(mapStateToProps,{fetchAdvertMedia})
(translate('common')(withStyles(contactStyle)(AdvertMedia)));