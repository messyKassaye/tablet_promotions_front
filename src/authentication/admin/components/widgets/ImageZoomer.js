import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import imageZoomerStyle from "../styles/imageZoomerStyle";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
class ImageZoomer extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <Card className={classes.container}>
                    <CardContent style={{padding:0}}>
                        {
                            this.props.advert.picture===null
                            ?
                                (
                                    <Skeleton
                                        variant={"rect"}
                                        width={500}
                                        height={400}
                                        style={{backgroundColor:grey[500]}}/>
                                )
                            :
                                (
                                    <img
                                        width={500}
                                        height={420}
                                        src={this.props.advert.picture}
                                    />
                                )
                        }

                    </CardContent>
                </Card>
            </div>

        );
    }
}

export default withStyles(imageZoomerStyle)(ImageZoomer);