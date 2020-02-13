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
            fileUploadMessage:'We are Zipping your file. Please wait us',

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

    }

    componentWillReceiveProps(nextProps, nextContext) {
      if (nextProps.response.status){
          this.setState({
              fileUploadMessage:'Zipping has done. Download started',
              submitted:false,
              loading:false,
          })
          this.download(nextProps.response.file_path)
      }
    }

    download = filePath=>{
      axios.put(`${API_URL}download/${filePath}`,null,{
          responseType: 'blob',
      })
          .then((response) => {
              var fileURL = window.URL.createObjectURL(new Blob([response.data]));
              var fileLink = document.createElement('a');

              fileLink.href = fileURL;
              fileLink.setAttribute('download', filePath);
              document.body.appendChild(fileLink);
              fileLink.click();
              window.location.reload()
          });
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
                                        <Typography>{this.state.fileUploadMessage}</Typography>
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