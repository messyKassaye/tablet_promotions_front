import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import mediaPlayerStyle from "../style/mediaPlayerStyle";
import {Card, CardActions, CardContent,Divider} from "@material-ui/core";
class MediaPlayer extends Component {
    constructor(props) {
        super(props);

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
            </Card>
        );
    }
}

export default withStyles(mediaPlayerStyle)(MediaPlayer);