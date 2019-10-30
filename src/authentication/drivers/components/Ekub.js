import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ekubStyle from "../style/ekubStyle";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
class Ekub extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Typography>No one is registered to be a member of Ekub. Be the first</Typography>
                <Button color='primary' variant='contained' style={{marginTop:10}}>
                    <span>Start now</span>
                    <ChevronRightIcon/>
                </Button>
            </div>
        );
    }


}

export default withStyles(ekubStyle)(Ekub)