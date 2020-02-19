import React, {Component} from 'react';
import {Card, CardContent, CardHeader,Divider} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'

class ViewedAndPaymentDeclinedAdvert extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                 title={'Viewed and payment prohibited adverts'}
                 avatar={<VideocamIcon/>}
                />
                <Divider/>
                <CardContent>

                </CardContent>
            </Card>
        );
    }
}

export default ViewedAndPaymentDeclinedAdvert;