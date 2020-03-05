import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import mediaPlayerStyle from "../style/mediaPlayerStyle";
class MediaPlayer extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const {classes} = this.props
        return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <video className={classes.video} controls autoplay>
                <source src={this.props.adverts.media_path} type="video/mp4"/>
                </video>
            </div>
        );
    }
}

export default withStyles(mediaPlayerStyle)(MediaPlayer);