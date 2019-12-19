import React, {Component} from 'react';
import childCategoryStyle from "./styles/chilCategory";
import withStyles from "@material-ui/core/styles/withStyles";
import GridListTile from "@material-ui/core/GridListTile";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
class ChildCarCategory extends Component {

    findCars = (categoryId)=>{

    }
    render() {
        const {classes,category} = this.props
        return (
            <GridListTile className={classes.box}>
                <Card elevation={0}>
                    <CardHeader
                        avatar={<Avatar src={category.image}></Avatar>}
                        title={category.name}
                        action={
                            <IconButton color='inherit'>
                            <MoreHorizIcon/>
                            </IconButton>
                        }
                    />
                    <Divider/>
                    <CardContent>
                        <Typography>{`Maximum view per people: ${category.number_of_people}`}</Typography>
                        <div style={{marginTop:20}}>
                            <Typography>{category.description}</Typography>
                        </div>
                    </CardContent>
                </Card>
            </GridListTile>
        );
    }
}

export default withStyles(childCategoryStyle)(ChildCarCategory);
