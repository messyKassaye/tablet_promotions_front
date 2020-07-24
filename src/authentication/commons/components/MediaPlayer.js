import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import mediaPlayerStyle from "../style/mediaPlayerStyle";
import {Button, Card, CardActions, CardContent, Divider} from "@material-ui/core";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {updateAdvert} from "../../admin/state/action/advertsAction";
import {connect} from "react-redux";
class MediaPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            formData:{
                'company_id':0,
                'product_name':'',
                'advertisement_media_type_id':0,
                'is_all_over_ethiopia':0,
                'media_path':'',
                'status':'',
                'require_views_number':0,
            },
            moveText:'Move to advert air',
            moveVariant: 'contained'
        }

    }


    moveToAdvertAir = (status)=>{
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        formData['status']=status
        this.setState(formData)
        this.props.updateAdvert(formData,this.props.adverts.id)
    }

    mediaActions = ()=>{
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = true
        return <div style={{display:'flex',flexDirection:'row'}}>
            <LoadingButton
                color="secondary"
                variant={'outlined'}
                onClick={()=>this.moveToAdvertAir('cancel')}
                disabled={!isEnabled || this.state.submitted}
                loading={setLoading}
                text={'Cancel'}
                done={finished}
                size={'small'}
                style={{textTransform:'none',marginLeft:15}}
            >
                Cancel
            </LoadingButton>
            <LoadingButton
                color="primary"
                variant={this.state.moveVariant}
                onClick={()=>this.moveToAdvertAir('on_advert')}
                disabled={!isEnabled || this.state.submitted}
                loading={setLoading}
                text={this.state.moveText}
                done={finished}
                size={'small'}
                style={{textTransform:'none',marginLeft:15}}
            >
                {this.state.moveText}
            </LoadingButton>
        </div>
    }
    cancelAction = ()=>{
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = true

        return   <LoadingButton
            color="secondary"
            variant={'outlined'}
            onClick={()=>this.moveToAdvertAir('cancel')}
            disabled={!isEnabled || this.state.submitted}
            loading={setLoading}
            text={'Cancel'}
            done={finished}
            size={'small'}
            style={{textTransform:'none',marginLeft:15}}
        >
            Cancel
        </LoadingButton>
    }



    render() {
        const {classes} = this.props
        return (
            <Card elevation={0}>
                <CardContent style={{padding:0}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <video className={classes.video} controls autoPlay>
                            <source src={this.props.adverts.media_path} type="video/mp4"/>
                        </video>
                    </div>
                    <Divider/>
                    <CardActions style={{display:'flex',flexDirection:'row',justifyContent:"flex-end"}}>
                        {this.props.action}
                    </CardActions>
                </CardContent>

                <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                    {
                        this.props.adverts.status==='on_advert'
                        ?
                            (this.cancelAction())
                        :
                            (this.mediaActions())
                    }
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = state=>({
    users:state.userData.user,
    loading:state.userData.loading,
    response:state.authReducer.adminReducers.advertReducer.response
})

export default connect(mapStateToProps,{updateAdvert})
(withStyles(mediaPlayerStyle)(MediaPlayer));