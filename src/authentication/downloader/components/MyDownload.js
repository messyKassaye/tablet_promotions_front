import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Grid, Divider, Typography,Button} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import GetAppIcon from '@material-ui/icons/GetApp';
import {green, grey} from "@material-ui/core/colors";
import {fetchDownload} from "../state/action/FileHandlerAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
class MyDownload extends Component {
    constructor(props) {
        super(props);
        this.state ={
            downloading:false
        }

    }

    componentDidMount() {
        this.props.fetchDownload()
    }

    startDownloading = ()=>{
        this.setState({
            downloading:true
        })
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
                                <Card style={{backgroundColor:green[500],color:'white'}}>
                                    <CardHeader
                                     title={'New download'}
                                     avatar={<GetAppIcon/>}
                                    />
                                    <Divider/>
                                    <CardContent>
                                        {
                                         this.props.loading
                                         ?
                                             (
                                                 <Skeleton variant={"rect"} width={'100%'} height={100} style={{backgroundColor:grey[500]}}/>
                                             )
                                         :
                                             (
                                                 <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                     <Typography>{`Total file numbers: ${this.props.response.total_file_number}`}</Typography>
                                                     <Typography>{`Total file size: ${this.props.response.total_file_size}`}</Typography>
                                                     <Button
                                                         disabled={this.state.downloading}
                                                         onClick={this.startDownloading}
                                                         color={"secondary"}
                                                         variant={"contained"}
                                                         style={{marginTop:25}}>
                                                         Download now
                                                     </Button>
                                                 </div>
                                             )
                                        }
                                    </CardContent>
                                </Card>

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

const mapStateToProps = state=>({
    response:state.authReducer.downloaderReducers.downloadsReducer.response,
    loading:state.authReducer.downloaderReducers.downloadsReducer.loading
})

export default connect(mapStateToProps,{fetchDownload})(MyDownload);