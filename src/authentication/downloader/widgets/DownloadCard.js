import React, {Component} from 'react';
import {green, grey} from "@material-ui/core/colors";
import {Button, Card, CardContent, CardHeader, Divider, LinearProgress, Typography} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import {API_URL} from "../../../constants/constants";
import {handleFileZipping} from "../state/action/FileHandlerAction";
import {connect} from "react-redux";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
class DownloadCard extends Component {
    constructor(props) {
        super(props);
        this.state ={
            downloading:false,
            loaded:0,
            valueBuffer:0,
            uploadStarted:false,
            fileUploadMessage:'File Downloading. We reach 0%',

            submitted: false,
            loading: false,
            finished: false,
        }

    }

    startDownloading = ()=>{
        this.setState({
            submitted:true,
            loading:true,
            downloading:true
        })
       this.props.handleFileZipping();

        /*axios.post(`${API_URL}download`,null,{
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
            })*/

    }

    componentWillReceiveProps(nextProps, nextContext) {
      if (nextProps.response.status){
          this.download(nextProps.response.file_path)
      }
    }

    download = filePath=>{

    }

    render() {

        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = true

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
                        <div style={{backgroundColor:'white',marginTop:20}}>
                            <LoadingButton
                                color='primary'
                                onClick={this.startDownloading}
                                variant="contained"
                                type="submit"
                                disabled={!isEnabled || this.state.submitted}
                                loading={setLoading}
                                text={'Download now'}
                                done={finished}
                                style={{borderRadius:0}}
                            >
                                {
                                    'Download now'
                                }
                            </LoadingButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.downloaderReducers.downloadsReducer.response
})

export default connect(mapStateToProps,{handleFileZipping})(DownloadCard);