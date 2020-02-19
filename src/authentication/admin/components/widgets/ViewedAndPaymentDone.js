import React, {Component} from 'react';
import {Card, CardContent, CardHeader,Divider} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'

class ViewedAndPaymentDone extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                 title={'Viewed and payed adverts'}
                 avatar={<VideocamIcon/>}
                />
                <Divider/>
                <CardContent>

                </CardContent>
            </Card>
        );
    }
}

export default ViewedAndPaymentDone;