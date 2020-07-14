import React, {Component} from 'react';
import {Card, CardContent, CardHeader,Divider} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import {connect} from "react-redux";

class AdvertisedCompanies extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                    title={'Advertised companies'}
                    avatar={<BusinessIcon/>}/>
                    <Divider/>
                <CardContent>

                </CardContent>
            </Card>
        );
    }
}

export default AdvertisedCompanies;