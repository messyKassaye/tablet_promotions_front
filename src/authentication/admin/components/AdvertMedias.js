import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add'
import Divider from "@material-ui/core/Divider";
import {showMainDialog} from "../state/action/dialogAction";
import {connect} from "react-redux";
import {fetchAdvertMediaType} from "../state/action/advertisementMediaTypeActions";
import AddNewAdvertisementMedia from "../dialogs/component/AddNewAdvertisementMedia";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";
import MusicNotIcon from '@material-ui/icons/MusicNote'
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteMessage from "../dialogs/component/DeleteMessage";
class AdvertMedias extends Component {

    addNewMediaType = ()=>{
        this.props.showMainDialog({'show':true,
            'page':<AddNewAdvertisementMedia form={{type:'form',data:null}}/>,
            'title':'Add new advertisement media type',
            actions:{on:false,path:'',id:''}})
    }

    handleButtonClick = (eventType,titles,action)=>{
        this.props.showMainDialog({'show':true,'page':eventType,title: titles,actions:action})
    }

    componentDidMount() {
        this.props.fetchAdvertMediaType()
    }

    render() {
        return (
            <Container maxWidth='lg'>
                <Card>
                    <CardHeader
                     title={'Advertisement media types'}
                     action={
                         <IconButton color='inherit' onClick={this.addNewMediaType}>
                             <AddIcon/>
                         </IconButton>
                     }
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={2}>
                        {
                         this.props.loading
                         ?
                             <FourByFourSkeleton/>
                         :
                             (
                                 this.props.medias.length>0
                                 ?
                                     (
                                         this.props.medias.map(media=>(
                                             <Grid key={media.id} item md={4} xs={12}>
                                                 <Card style={{backgroundColor:green[500],color:'white'}}>
                                                     <CardHeader
                                                         title={media.name}
                                                         avatar={<MusicNotIcon/>}
                                                     />
                                                     <Divider/>

                                                     <CardContent>
                                                         <Typography>
                                                             {`Payment: ${media.per_view_payment} ${media.currency.symbol}`}
                                                         </Typography>
                                                         <Typography>
                                                             {`Total adverts: ${media.adverts.length}`}
                                                         </Typography>
                                                     </CardContent>

                                                     <CardActions style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                                                         <Button
                                                             style={{textTransform:'none'}}
                                                             color={'inherit'}
                                                             onClick=
                                                                 {()=>this.handleButtonClick(
                                                                     <DeleteMessage message={`Are you sure you want to remove media type ${media.name}`}/>,
                                                                     'Confirmation',{on:true,path:'advertisement_media',id:media.id})}
                                                             variant={'text'}>
                                                             Remove
                                                         </Button>
                                                         <Button
                                                          style={{textTransform:'none'}}
                                                          color='inherit'
                                                          variant='outlined'
                                                          onClick={()=>this.handleButtonClick(
                                                              <AddNewAdvertisementMedia form={{type:'Edit',data:media}}/>,
                                                              `Edit ${media.name}`,
                                                              media
                                                          )}
                                                         >
                                                             Edit
                                                         </Button>
                                                     </CardActions>
                                                 </Card>
                                             </Grid>
                                         ))
                                     )
                                 :
                                     (
                                         <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                             <Typography>There is no registered advert media type.</Typography>
                                         </div>
                                     )
                             )
                        }
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    medias:state.authReducer.adminReducers.advertMediaReducer.advertMedia,
    loading:state.authReducer.adminReducers.advertMediaReducer.loading
})

export default connect(mapStateToProps,{showMainDialog,fetchAdvertMediaType})(AdvertMedias);
