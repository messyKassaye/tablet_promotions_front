import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid,
Typography} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Skeleton from "@material-ui/lab/Skeleton";
import {deepPurple, grey} from "@material-ui/core/colors";
import {me} from "../../../state/actions/usersActions";
import {connect} from "react-redux";
class TopViewedAdvert extends Component {

    componentDidMount() {
        this.props.me()
    }

    myAdverts = companies => {
        let topViewedAdverts = [];
        companies.map(company => {
            company.adverts.map(advert=>{
                if (advert.views.length>0){
                    topViewedAdverts.push(advert)
                }
            })
        })
        return topViewedAdverts;
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={'Top viewed adverts'}
                    avatar={<VisibilityIcon/>}
                    style={{backgroundColor:deepPurple[500],color:'white'}}/>
                <Divider/>
                <CardContent>
                    {
                        this.props.loading
                            ?
                            (
                                <Grid container spacing={2}>
                                    <Grid item md={4} xs={12} sm={12}>
                                        <Skeleton variant={"rect"} height={150} style={{backgroundColor:grey[500]}}/>
                                    </Grid>
                                    <Grid item md={4} xs={12} sm={12}>
                                        <Skeleton variant={"rect"} height={150} style={{backgroundColor:grey[500]}}/>
                                    </Grid>
                                    <Grid item md={4} xs={12} sm={12}>
                                        <Skeleton variant={"rect"} height={150} style={{backgroundColor:grey[500]}}/>
                                    </Grid>
                                </Grid>
                            )
                            :
                            (
                                <Grid container spacing={2}>
                                    {
                                        this.myAdverts(this.props.user.relations.companies)
                                            .map(advert => (
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card>
                                                        <CardHeader
                                                            title={advert.product_name}
                                                            subheader={advert.advert_media_type.name}
                                                            avatar={
                                                                <Avatar>{advert.product_name.charAt(0)}</Avatar>}
                                                        />
                                                        <Divider/>
                                                        <CardContent>
                                                            <Typography>
                                                                {`Expected play: ${advert.required_views_number.toLocaleString()}`}
                                                            </Typography>
                                                            <Typography>
                                                                {`Total Views: ${advert.views.length}`}
                                                            </Typography>
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
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading
    }
)

export default connect(mapStateToProps,{me})(TopViewedAdvert);