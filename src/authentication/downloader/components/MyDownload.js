import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Grid, Divider, Typography,Button} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import GetAppIcon from '@material-ui/icons/GetApp';
import VideocamIcon from '@material-ui/icons/Videocam'
import DownloadCard from "../widgets/DownloadCard";
class MyDownload extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container maxWidth={"lg"}>
                <Card>
                    <CardHeader
                    title={'All adverts'}
                    avatar={<VideocamIcon/>}
                    />
                    <Divider/>
                    <CardContent>

                    </CardContent>
                </Card>
            </Container>
        );
    }
}


export default MyDownload;