import React from "react";
import {Card, Container} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import videoStyle from "../../styles/video_style";
import {translate} from "react-i18next";
import images from "../data/images";
import CrossfadeImage from "react-crossfade-image";
import Button from "@material-ui/core/Button";
class VideoAndImages extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            index:0
        }
        this.changeImage = this.changeImage.bind(this)
    }

    changeImage() {
        if (this.state.index === images.length - 1) {
            this.setState({ index: 0 });
        } else {
            this.setState({ index: this.state.index + 1 });
        }
    }
    render() {
        const {classes} =this.props
        const {duration}=300
        return(
            <Container maxWidth='md' className={classes.video}>
                <div style={{padding:10,maxWidth:450,maxHeight:300}}>
                    <CrossfadeImage
                        src={images[this.state.index].path}
                        duration={300}
                        timingFunction={"ease-out"}/>
                </div>
                <div>
                    <Button color='primary' onClick={this.changeImage}>Click</Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(videoStyle)(translate('common')(VideoAndImages))