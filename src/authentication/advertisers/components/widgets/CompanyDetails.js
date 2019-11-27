import React from "react";
import {GridListTile} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import MusicNotIcon from "@material-ui/icons/MusicNote";
import withStyles from "@material-ui/core/styles/withStyles";
import boxStyle from "../../styles/boxStyle";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
class CompanyDetails extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <GridListTile>
                    <Card elevation={0} className={classes.box}>
                        <CardHeader
                            title={'Details'}
                            avatar={<MusicNotIcon/>}
                        />
                        <Divider/>
                        <CardContent style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            {
                             <div>
                                 <Typography>{`Phone : ${this.props.company.phone}`}</Typography>
                                 <Typography>Website: <a href={this.props.company.website} >{this.props.company.website}</a></Typography>
                             </div>
                            }
                        </CardContent>
                        <CardActions style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                            <Button
                                style={{textTransform:'capitalize'}}
                                color='secondary'
                                variant='text'>
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
            </GridListTile>
        );
    }

}

export default withStyles(boxStyle)(CompanyDetails)
