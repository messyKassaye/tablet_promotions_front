import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

class DownloadHistory extends Component {
    render() {
        return (
           <Card style={{marginTop:20}}>
                    <CardHeader
                     title={'Your download history'}
                     avatar={<GetAppIcon/>}
                     style={{backgroundColor:'#3C4252',color:'white'}}
                    />
                    <Divider/>
                    <CardContent>

                    </CardContent>
                </Card>
        );
    }
}

export default DownloadHistory;