import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import authstyle from "../../../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CardActions from "@material-ui/core/CardActions";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
class TotalAdvertedMedia extends React.Component{

    constructor(props) {
        super(props);
     this.sumOfTypes = this.sumOfTypes.bind(this);
    }

    sumOfTypes = (data,name)=> {
        let video =0;
     data.map(cars=>cars.map(items=>items.adverts.filter(item=>{
           return item.detail.advert_media_type.name === name
       }))).map(items=>items.map(videoItem=>{
           video += videoItem.length
     }))
        return video
    }


    render() {
        const {classes}= this.props
        return (
            <div>
                {
                    this.props.loading?
                        <Skeleton variant='rect' width='100%' height={150}/>
                        :
                        (
                            <Card  className={classes.card2}>
                                <CardContent>
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <div style={{display:'flex',flexDirection:'column',marginRight:10,alignItems:'center',justifyContent:'center'}}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {this.sumOfTypes(this.props.user.map(items=>items.relations.cars),'Video')}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                                Video
                                            </Typography>
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column',marginRight:10,alignItems:'center',justifyContent:'center'}}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {this.sumOfTypes(this.props.user.map(items=>items.relations.cars),'Audio')}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                                Audio
                                            </Typography>
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {this.sumOfTypes(this.props.user.map(items=>items.relations.cars),'Image')}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                                Image
                                            </Typography>
                                        </div>

                                    </div>
                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    <Button style={{color:'white',textTransform:'capitalize'}}>
                                        <span>More</span><ChevronRightIcon/>
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                }
            </div>
        );
    }


}

const mapStateToProps = state=>(
    {
        user:state.userData.user,
        loading:state.userData.loading
    }
)

export default withStyles(authstyle)(connect(mapStateToProps)(TotalAdvertedMedia))