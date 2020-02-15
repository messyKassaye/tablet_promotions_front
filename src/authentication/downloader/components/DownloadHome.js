import React, {Component} from 'react';
import {connect} from "react-redux";
import {setPlace} from "../state/action/PivotAction";
import {Card, CardContent, Container, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {green} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import downloadHomeStyle from "./styles/downloadHome";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import DownloadCard from "../widgets/DownloadCard";
import DownloadSize from "./DownloadSize";
import DownloadHistory from "./DownloadHistory";
class DownloadHome extends Component {
    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                {
                    this.props.loading
                    ?
                        (
                            <Skeleton variant={"rect"} width={'100%'} height={100}/>
                        )
                    :
                        (
                            <div>
                                {
                                    this.props.user.relations.place.length
                                    ?
                                        (
                                           null
                                        )
                                    :
                                        (
                                            <Card style={{backgroundColor:green[500],color:'white'}}>
                                                <CardContent className={classes.setPlace}>
                                                    <Typography>{`Hello, ${this.props.user.attribute.first_name}
                                                     ${this.props.user.attribute.last_name} Welcome to Tablet advertising. You are registered as File downloader and we appreciate that but, before starting download of our file first you have to set your locations or where you leave`}
                                                    </Typography>
                                                    <Button
                                                        component={Link}
                                                        to={'/auth/downloader/set_place'}
                                                        color={"white"}
                                                        variant={"outlined"}
                                                        style={{textTransform:'none',color:'white',marginTop:10}}>Set my location</Button>
                                                </CardContent>
                                            </Card>
                                        )
                                }
                            </div>
                        )
                }
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12} sm={12}>
                        <DownloadCard/>
                    </Grid>

                    <Grid item md={6} xs={12} sm={12}>
                        <DownloadSize/>
                    </Grid>
                </Grid>
                <DownloadHistory/>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading
})

export default connect(mapStateToProps,{setPlace})(withStyles(downloadHomeStyle)(DownloadHome));