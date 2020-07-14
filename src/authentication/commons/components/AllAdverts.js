import React, {Component} from 'react';
import VideocamIcon from '@material-ui/icons/Videocam'
import {Card,CardHeader,CardContent} from "@material-ui/core";
class AllAdverts extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                title={'All your adverts'}
                avatar={<VideocamIcon/>}/>
                <CardContent>

                </CardContent>
            </Card>
        );
    }
}

export default AllAdverts;