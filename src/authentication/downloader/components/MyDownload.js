import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Grid, Divider, Typography,Button} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import GetAppIcon from '@material-ui/icons/GetApp';

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
                    title={'My downloads'}
                    avatar={<CloudDownloadIcon/>}
                    style={{backgroundColor:'#3C4252',color:"white"}}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={2}>

                            <Grid item md={4} xs={12} sm={12}>
                                <DownloadCard/>

                            </Grid>

                            <Grid item md={8} xs={12} sm={12}>
                                <Card>
                                    <CardHeader
                                     title={'Your previous download'}
                                     avatar={<GetAppIcon/>}
                                    />
                                    <Divider/>
                                    <CardContent>

                                    </CardContent>
                                </Card>

                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </Container>
        );
    }
}


export default MyDownload;