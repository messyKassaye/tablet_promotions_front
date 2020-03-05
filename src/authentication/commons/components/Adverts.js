import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Grid} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'
import {connect} from "react-redux";
import SingleLoading from "../loading/SingleLoading";
import AdvertCard from "./AdvertCard";
import {show} from "../../advertisers/state/action/advertAction";

class Adverts extends Component {

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.show(id)
    }

    render() {
        return (
            <Container maxWidth={"md"}>
                <Grid container spacing={2}>
                    <Grid item md={9} xs={12} sm={12}>
                        <Card>
                            <CardHeader
                             title={'Advert'}
                             avatar={<VideocamIcon/>}
                            />
                            <CardContent>
                                <Grid container spacing={2}>

                                {
                                    this.props.loading
                                    ?
                                        (
                                            <Grid container spacing={2}>
                                                <SingleLoading/>
                                                <SingleLoading/>
                                                <SingleLoading/>
                                                <SingleLoading/>
                                            </Grid>
                                        )
                                    :
                                        (
                                          <span>{this.props.adverts.status}</span>
                                        )
                                }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    adverts: state.authReducer.advertisersReducers.advertData.adverts,
    loading: state.authReducer.advertisersReducers.advertData.showLoading
})

export default connect(mapStateToProps,{show})
(Adverts);