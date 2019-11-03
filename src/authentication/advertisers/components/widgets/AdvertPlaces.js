import React from "react";
import PlaceIcon from '@material-ui/icons/Place'
import {GridListTile} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import boxStyle from "../../styles/boxStyle";
import Divider from "@material-ui/core/Divider";
class AdvertPlaces extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <GridListTile className={classes.box}>
                <Card elevation={0}>
                    <CardHeader
                    title={'Advertisement place'}
                    avatar={<PlaceIcon/>}
                    />
                    <Divider/>
                    <CardContent>
                        {
                            <div>
                                <Typography>
                                    {`Country : ${this.props.adverts.places.map(place=>{return place.country})}`}
                                </Typography>
                                <Typography>
                                    {`City : ${this.props.adverts.places.map(place=>{return place.city})}`}
                                </Typography>
                            </div>
                        }
                    </CardContent>
                </Card>
            </GridListTile>
        );
    }


}

export default withStyles(boxStyle)(AdvertPlaces)