import React, {Component} from 'react';
import {green, grey} from "@material-ui/core/colors";
import {Button, Card, CardContent, CardHeader, Divider, LinearProgress, Typography} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import {API_URL} from "../../../constants/constants";
class DownloadCard extends Component {
    constructor(props) {
        super(props);
        this.state ={
            downloading:false,
            loaded:0,
            valueBuffer:0,
            uploadStarted:false,
            fileUploadMessage:'File Downloading. We reach 0%'
        }

    }

    startDownloading = ()=>{
        this.setState({
            downloading:true,

        })

        axios.post(`${API_URL}download`,null,{
            onDownloadProgress:progressEvent => {
                this.setState({
                    loaded:Math.round((progressEvent.loaded * 100) / progressEvent.total),
                    fileUploadMessage: `File downloading. We reach ${this.state.loaded}%`
                })
            }
        }).then(res=>{
                if (this.state.loaded===100){
                    setTimeout(()=>{
                        this.setState({
                            fileUploadMessage:`Downloading done. ${this.state.loaded}%`
                        })
                        window.location.reload()
                    },2000)
                }
            })

    }
    render() {
        return (
            <Card style={{backgroundColor:green[500],color:'white'}}>
                <CardHeader
                    title={'New download'}
                    avatar={<GetAppIcon/>}
                />
                <Divider/>
                <CardContent>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        {
                            this.state.downloading
                            ?
                                (
                                    <div>
                                        <LinearProgress
                                            variant='buffer'
                                            color='secondary'
                                            valueBuffer={this.state.loaded}
                                            value={this.state.loaded}>
                                        </LinearProgress>
                                        <span>{this.state.fileUploadMessage}</span>
                                    </div>
                                )
                            :
                                (
                                    <Typography>
                                        {'Download more data now , share to every driver and get more income'}
                                    </Typography>
                                )
                        }
                        <Button
                            disabled={this.state.downloading}
                            onClick={this.startDownloading}
                            color={"secondary"}
                            variant={"contained"}
                            style={{marginTop:25}}>
                            Download now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
}


export default DownloadCard;