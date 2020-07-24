import React, {Component} from 'react';
import {Container, Card, CardHeader, CardContent, Grid, Avatar,
Divider,CardActions,Typography,Button} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import {connect} from "react-redux";
import {fetchCheckedAdvert} from "../../commons/state/actions/AdvertCheckerAction";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import perPlayStyle from "../../commons/style/perPlayStyle";
import AdvertViewTab from "../../commons/components/widgets/advertViewTab";
import nFormatter from "../../services/MainServices";
import {Link} from "react-router-dom";
class AdvertChecker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showView:false,
            advert:null
        }
    }
    componentDidMount() {
        this.props.fetchCheckedAdvert('admin');
    }

    showViews = (advert)=>{
        this.setState({
            showView:true,
            advert:advert
        })
    }

    backToMain = ()=>{
        this.setState({
            showView:false
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Card>
                    <CardHeader
                    title={'Select advert and check advert views of each car'}
                    avatar={<AttachMoneyIcon/>}
                    style={{backgroundColor:'#3C4252',color:'white'}}
                    />
                <CardContent>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                        {
                            this.state.showView
                            ?
                                (<span>back to main</span>)
                            :
                                (
                                    <span>Search</span>
                                )
                        }
                    </div>
                        {
                            this.state.showView
                            ?
                                (
                                    <div>
                                        <AdvertViewTab advert={this.state.advert}/>
                                    </div>
                                )
                            :
                                (
                                    <Grid container spacing={2}>
                                        {
                                            this.props.loading
                                                ?
                                                (
                                                    <FourByFourSkeleton/>
                                                )
                                                :
                                                (
                                                    this.props.adverts.map(advert=>(
                                                        <Grid key={advert.id} item md={4} xs={12} sm={12}>
                                                            <Card>
                                                                <CardHeader
                                                                    title={advert.product_name}
                                                                    subheader={advert.company.name}
                                                                    avatar={<Avatar>{advert.product_name.charAt(0)}</Avatar>}
                                                                />
                                                                <Divider/>
                                                                <CardContent>
                                                                    <div className={classes.playCard}>
                                                                        <Typography>Media type</Typography>
                                                                        <Typography color={"primary"}>{advert.advert_media_type.name}</Typography>
                                                                    </div>

                                                                    <div className={classes.playCard}>
                                                                        <Typography>Expected play</Typography>
                                                                        <Typography color={"primary"}>{nFormatter(advert.required_views_number,1)}</Typography>
                                                                    </div>

                                                                    <div className={classes.playCard}>
                                                                        <Typography>Current play</Typography>
                                                                        <Typography color={"primary"}>{nFormatter(advert.views,1)}</Typography>
                                                                    </div>

                                                                </CardContent>
                                                                <CardActions className={classes.actions}>
                                                                    <Button
                                                                        component={Link}
                                                                        to={`/auth/admin/car_advert_checker/${advert.id}`}
                                                                        color={"primary"}
                                                                        variant={"outlined"}
                                                                        style={{textTransform:'none'}}
                                                                    >
                                                                        Show views
                                                                    </Button>
                                                                </CardActions>
                                                            </Card>
                                                        </Grid>
                                                    ))
                                                )
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
    adverts:state.authReducer.commonReducer.commonAdvertChecker.adverts,
    loading:state.authReducer.commonReducer.commonAdvertChecker.loading,
    user:state.userData.user,
    userLoading:state.userData.loading
})

export default withStyles(perPlayStyle)
(connect(mapStateToProps,{fetchCheckedAdvert})(AdvertChecker));