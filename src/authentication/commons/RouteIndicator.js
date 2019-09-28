 import React from "react";
 import CardContent from "@material-ui/core/CardContent";
 import Typography from "@material-ui/core/Typography";
 import {Link} from "react-router-dom";
 import Card from "@material-ui/core/Card";
 import ChevronRightIcon from '@material-ui/icons/ChevronRight'

class RouteIndicator extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
                <Card>
                    <CardContent style={{display:'flex',flexDirection:'row',paddingBottom:10,paddingTop:10}}>
                        <Typography component='p' variant='h6'>{this.props.currentPage}</Typography>
                        <div style={{display:'flex',flexGrow:1}}/>
                        <div style={{display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <span>App</span>
                            <ChevronRightIcon/>
                            <span style={{textDecoration:'none'}}>{this.props.currentPage}</span>
                        </div>
                    </CardContent>
                </Card>
        );
    }


}
export default RouteIndicator
