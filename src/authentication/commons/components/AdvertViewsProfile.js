import React, {Component} from 'react';
import {Container,Grid} from "@material-ui/core";
import {showAdvertView} from "../state/actions/advertViewAction";
import {connect} from "react-redux";
import FourByFourSkeleton from "../loading/customSkeleton";
import CommonAdvertViewTab from "./widgets/CommonAdvertViewTab";
import {commonShowAdvert} from "../state/actions/commonAdvertAction";

class AdvertViewsProfile extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.commonShowAdvert(id)
        this.props.showAdvertView(id)

    }

    render() {
        return (
            <Container maxWidth={"md"}>
                {
                    this.props.loading && this.props.advertLoading
                    ?
                        (
                            <FourByFourSkeleton/>
                        )
                    :
                        (
                           <Grid container spacing={2}>
                               {
                                 <CommonAdvertViewTab advert={this.props.advert} views={this.props.advertView}/>
                               }
                           </Grid>
                        )
                }
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    advertView:state.authReducer.commonReducer.commonAdvertViewReducer.advertViews,
    loading:state.authReducer.commonReducer.commonAdvertViewReducer.loading,
    advert:state.authReducer.commonReducer.commonAdvertsReducer.advert,
    advertLoading:state.authReducer.commonReducer.commonAdvertsReducer.loading
})

export default connect(mapStateToProps,{showAdvertView,commonShowAdvert})(AdvertViewsProfile);
