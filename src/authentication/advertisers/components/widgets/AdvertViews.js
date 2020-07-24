import React from "react";
import {GridListTile} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import boxStyle from "../../styles/boxStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import {Link} from "react-router-dom";
import nFormatter from "../../../services/MainServices";
class AdvertViews extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <GridListTile className={classes.box}>
                <Card elevation={0}>
                    <CardHeader
                     title={'Advertisement views'}
                     avatar={<VisibilityIcon/>}
                    />
                    <Divider/>
                    <CardContent>
                        {
                            <div>
                                    <Typography>
                                        {`Expected play : ${nFormatter(this.props.adverts.required_views_number,1)}`}
                                    </Typography>
                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:"center"}}>
                                        <Typography>
                                            {`Current play :  ${nFormatter(this.props.adverts.car_advert.length,1)}`}
                                        </Typography>
                                    </div>
                            </div>

                        }
                    </CardContent>
                    <CardActions style={{display:'flex',justifyContent:'flex-end'}}>
                        <Button
                            component={Link}
                            to={`/auth/advertiser/advertViews/${this.props.adverts.id}`}
                            style={{textTransform:'capitalize',marginLeft:5}}
                            size='small'
                            color='secondary'
                            variant='outlined'>
                            Show detail
                        </Button>
                    </CardActions>
                </Card>
            </GridListTile>
        );
    }


}

export default withStyles(boxStyle)(AdvertViews)
