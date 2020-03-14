import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

class DownloadHistory extends Component {
    render() {
        return (
           <Card style={{marginTop:20}}>
                    <CardHeader
                     title={'Your download history'}
                     avatar={<GetAppIcon color={"inherit"}/>}
                    />
                    <Divider/>
                    <CardContent>

                    </CardContent>
                </Card>
        );
    }
}

export default DownloadHistory;