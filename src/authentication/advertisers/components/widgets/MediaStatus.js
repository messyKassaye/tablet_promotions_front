import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import GridListTile from "@material-ui/core/GridListTile";
import CardHeader from "@material-ui/core/CardHeader";
import MusicNotIcon from '@material-ui/icons/MusicNote'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import boxStyle from "../../styles/boxStyle";
import withStyles from "@material-ui/core/styles/withStyles";
class MediaStatus extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <GridListTile className={classes.box}>
                <Card elevation={0}>
                       <CardHeader
                       title={'Advert media status'}
                       avatar={<MusicNotIcon/>}
                       />
                       <Divider/>
                       <CardContent>
                           {
                               <div>
                                   <Typography>{`Type : ${this.props.adverts.advert_media_type.name}`}</Typography>
                                   <Typography>{`Payment : ${this.props.adverts.advert_media_type.per_view_payment} ETB`}</Typography>
                               </div>
                           }
                       </CardContent>
                </Card>
            </GridListTile>
        );
    }


}

export default withStyles(boxStyle)(MediaStatus)