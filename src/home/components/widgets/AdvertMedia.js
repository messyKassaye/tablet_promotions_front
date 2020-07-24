import React, {Component} from 'react';
import AdvertMediaStyle from "../styles/AdvertMediaStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {fetchAdvertMedia} from "../../state/action/advertMediaAction";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import {translate} from "react-i18next";
class AdvertMedia extends Component {

    componentDidMount() {
        this.props.fetchAdvertMedia()
    }

    render() {
        const {classes,t} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Card className={classes.advertMedia}>
                    <CardContent>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:20}}>
                            <Typography variant={"h4"}>{t('home.advert_media.title')}</Typography>
                        </div>
                        {
                            this.props.loading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card>
                                                <CardContent>
                                                    <div className={classes.carsHeader}>
                                                        <Skeleton variant={"circle"} width={50} height={50} style={{backgroundColor:grey[500]}}/>
                                                        <Skeleton variant={"rect"} width={200} height={20}
                                                                  style={{marginTop:10,backgroundColor:grey[500]}}/>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                )
                            :
                                (
                                    <Grid container spacing={2}>
                                        {
                                            this.props.medias.map(media=>(
                                                <Grid key={media.id} item md={4} xs={12} sm={12}>
                                                    <Card style={{backgroundColor:'#3C4252',color:'white'}}>
                                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:20}}>
                                                            <Avatar style={{backgroundColor:'white',color:'#3C4252',marginBottom:10}}>{media.name.charAt(0)}</Avatar>
                                                            <Typography>{t(`home.${media.name}`)}</Typography>
                                                        </div>
                                                        <CardContent style={{height:250,overflowY:"auto"}}>
                                                            <Divider/>
                                                            <div style={{textAlign:'justify'}}>
                                                                <Typography>{t(`home.${media.name}_description`)}</Typography>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                )
                        }
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    medias:state.homeReducer.mediaReducer.medias,
    loading:state.homeReducer.mediaReducer.loading
})

export default connect(mapStateToProps,{fetchAdvertMedia})(withStyles(AdvertMediaStyle)
(translate('common')(AdvertMedia)));