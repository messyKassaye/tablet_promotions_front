import React, {Component} from 'react';
import {Container, Grid,Divider,Typography ,
    Card, CardHeader, CardContent, Avatar} from "@material-ui/core";
import {showAdvertView} from "../state/actions/advertViewAction";
import {connect} from "react-redux";
import FourByFourSkeleton from "../loading/customSkeleton";
import {commonShowAdvert} from "../state/actions/commonAdvertAction";
import AdvertViewTab from "./widgets/advertViewTab";

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
            <Container maxWidth={"lg"}>
                {
                    this.props.loading && this.props.advertLoading
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
                                       <Grid container spacing={2}>
                                           <AdvertViewTab advert={this.props.advert}/>
                                       </Grid>
                                   </CardContent>
                               </Card>
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
