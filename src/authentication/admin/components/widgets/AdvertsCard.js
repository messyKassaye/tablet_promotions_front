import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Grid} from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import SingleLoading from "../../../commons/loading/SingleLoading";
import {deepOrange, deepPurple, green} from "@material-ui/core/colors";
import {connect} from "react-redux";
import {fetchUsers} from "../../state/action/adminUsersAction";
import {fetchAdverts} from "../../state/action/advertsAction";
class AdvertsCard extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchAdverts()
        this.interval()
    }

    sumOfTypes = (data, name) => {
        return data.filter(item => {
            return item.advert_media_type.name === name
        }).length
    }

    advertInType = (data,type)=>{
        return data.filter(item=>{
            return item.status===type
        }).length
    }

    interval = ()=>{
        setInterval(()=>{
            this.props.fetchAdverts()
        },1000)
    }
    render() {
        return (
        <Grid container spacing={2}>

            <Grid item md={6} xs={12} sm={12}>
                <Card>
                    <CardHeader
                        title={'Adverts'}
                        avatar={<VideocamIcon/>}
                    />
                    <CardContent>
                        {
                            this.props.advertLoading
                                ?
                                (
                                    <Grid container spacing={2}>
                                        <SingleLoading md={4} height={80}/>
                                        <SingleLoading md={4} height={80}/>
                                        <SingleLoading md={4} height={80}/>
                                    </Grid>
                                )
                                :
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card style={{backgroundColor:green[500],color:'white'}}>
                                                <CardHeader
                                                    title={this.advertInType(this.props.adverts,'on_progress')}
                                                    subheader={<span style={{color:'white'}}>New advert</span>}
                                                />
                                            </Card>
                                        </Grid>

                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card style={{backgroundColor:deepOrange[500],color:'white'}}>
                                                <CardHeader
                                                    title={this.advertInType(this.props.adverts,'on_advert')}
                                                    subheader={<span style={{color:'white'}}>On air advert</span>}
                                                />
                                            </Card>
                                        </Grid>

                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card style={{backgroundColor:deepPurple[500],color:'white'}}>
                                                <CardHeader
                                                    title={this.advertInType(this.props.adverts,'on_completed')}
                                                    subheader={<span style={{color:'white'}}>On finish advert</span>}
                                                />
                                            </Card>
                                        </Grid>


                                    </Grid>

                                )
                        }
                    </CardContent>
                </Card>
            </Grid>

            <Grid item md={6} xs={12}>
                <Card>
                    <CardHeader
                        title={'Adverts in media type'}
                        avatar={<VideocamIcon/>}
                    />
                    <CardContent>
                        {
                            this.props.userLoading
                                ?
                                (
                                    <Grid container spacing={2}>
                                        <SingleLoading md={4} height={80}/>
                                        <SingleLoading md={4} height={80}/>
                                        <SingleLoading md={4} height={80}/>

                                    </Grid>
                                )
                                :
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card style={{backgroundColor:'#3C4252',color:'white'}}>
                                                <CardHeader
                                                    title={this.sumOfTypes(this.props.adverts,'Video')}
                                                    subheader={<span style={{color:'white'}}>Video</span>}
                                                />
                                            </Card>
                                        </Grid>

                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card style={{backgroundColor:deepOrange[600],color:'white'}}>
                                                <CardHeader
                                                    title={this.sumOfTypes(this.props.adverts,'Audio')}
                                                    subheader={'Audio'}
                                                />
                                            </Card>
                                        </Grid>

                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card style={{backgroundColor:'#1976d2',color:'white'}}>
                                                <CardHeader
                                                    title={this.sumOfTypes(this.props.adverts,'Image')}
                                                    subheader={'Image'}
                                                />
                                            </Card>
                                        </Grid>

                                    </Grid>
                                )
                        }
                    </CardContent>
                </Card>

            </Grid>

        </Grid>
        );
    }
}

const mapStateToProps = state => ({
    adverts: state.authReducer.adminReducers.advertReducer.adverts,
    advertLoading: state.authReducer.adminReducers.advertReducer.loading,
})

export default connect(mapStateToProps, {fetchUsers, fetchAdverts})(AdvertsCard);