import React, {Component} from 'react';
import {connect} from "react-redux";
import {commonShowAdvert} from "../../commons/state/actions/commonAdvertAction";
import {Avatar, Card, CardContent, CardHeader, Container, Divider, Grid, Typography} from "@material-ui/core";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import ViewImageCard from "../../commons/components/ViewImageCard";
import {fetchCarAdvertChecker} from "../../commons/state/actions/CarAdvertCheckerAction";
import {me} from "../../state/actions/usersActions";

class CarAdvertChecker extends Component {

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.commonShowAdvert(id)
        this.props.me()
        this.props.fetchCarAdvertChecker('admin',id)
    }

    findRole = user=>{
        if (user.relations.role[0].id===1){
            return true
        }else {
            return false
        }
    }

    render() {
        return (
            <Container maxWidth={'lg'}>
                {
                    this.props.loading
                        ?
                        (
                            <FourByFourSkeleton/>
                        )
                        :
                        (
                            <Card>
                                <CardHeader
                                    title={this.props.advert.product_name}
                                    avatar={<Avatar>{this.props.advert.product_name.charAt(0)}</Avatar>}
                                    subheader={this.props.advert.company.name}
                                    action={<Typography color={"primary"} style={{padding:20}}>All views</Typography>}
                                />
                                <Divider/>
                                <CardContent>
                                    <div>
                                        {
                                            this.props.carAdvertLoading&&this.props.userLoading
                                            ?
                                                (
                                                    <Grid container spacing={2}>
                                                        <FourByFourSkeleton/>
                                                    </Grid>
                                                )
                                            :
                                                (
                                                    <Grid container spacing={2}>
                                                        {
                                                            this.props.carAdverts.data.length>0
                                                                ?
                                                                (
                                                                    this.props.carAdverts.data.map(carAds=>(
                                                                        <Grid key={carAds.id} item md={4} xs={12} sm={12}>
                                                                            <ViewImageCard carAds={carAds} action={this.findRole(this.props.user)}/>
                                                                        </Grid>
                                                                    ))
                                                                )
                                                                :
                                                                (
                                                                    <Grid item md={12} xs={12}>
                                                                        <Typography color={"primary"}>
                                                                            There is no advert views ):
                                                                        </Typography>
                                                                    </Grid>
                                                                )
                                                        }
                                                    </Grid>

                                                )
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        )
                }
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    advert:state.authReducer.commonReducer.commonAdvertsReducer.advert,
    loading:state.authReducer.commonReducer.commonAdvertsReducer.loading,
    carAdverts:state.authReducer.commonReducer.commonCarAdvertChecker.carAdverts,
    carAdvertLoading:state.authReducer.commonReducer.commonCarAdvertChecker.loading,
    user:state.userData.user,
    userLoading:state.userData.loading
})

export default connect(mapStateToProps,{commonShowAdvert,fetchCarAdvertChecker,me})(CarAdvertChecker);