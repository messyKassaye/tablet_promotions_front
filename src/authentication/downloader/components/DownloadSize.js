import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Divider, Typography} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";
import GetAppIcon from "@material-ui/icons/GetApp";

class DownloadSize extends Component {
    render() {
        return (
            <Card style={{backgroundColor:orange[500],color:'white'}}>
                <CardHeader
                 title={'Download size'}
                 avatar={<GetAppIcon/>}
                />
                <Divider/>
                <CardContent style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
                    <Typography>Your total downloaded file size is</Typography>
                    <Typography variant={"h4"} color={"secondary"} style={{marginTop:15}}>
                        4.5 MB
                    </Typography>

                </CardContent>
            </Card>
        );
    }
}

export default DownloadSize;