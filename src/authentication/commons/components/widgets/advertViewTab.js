import React, {Component} from 'react';
import {Card, CardContent, Container, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {showCarAdvert} from "../../state/actions/CommonCarAdvertAction";
import ViewImageCard from "../ViewImageCard";
import FourByFourSkeleton from "../../loading/customSkeleton";

class AdvertViewTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view:1
        }

    }

    componentDidMount() {
        this.props.showCarAdvert(this.props.advert.id)
    }

    handleClick = (value)=>{
       this.setState({
           view:value
       })
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
            <Container maxWidth={"lg"}>
                <Grid container spacing={2}>

                    {
                        this.props.loading&&this.props.userLoading
                        ?
                            (
                                <FourByFourSkeleton/>
                            )
                        :
                            (
                                this.props.carAdverts.data.map(carAds=>(
                                    <Grid key={carAds.id} item md={4} xs={12} sm={12}>
                                        <ViewImageCard carAds={carAds} action={this.findRole(this.props.user)}/>
                                    </Grid>
                                ))
                            )
                    }
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    carAdverts: state.authReducer.commonReducer.commonCarAdvertsReducer.carAdverts,
    loading:state.authReducer.commonReducer.commonCarAdvertsReducer.loading,
    user:state.userData.user,
    userLoading:state.userData.loading
})

export default connect(mapStateToProps,{showCarAdvert})
(AdvertViewTab);