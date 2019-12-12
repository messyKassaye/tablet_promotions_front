import React, {Component} from 'react';
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
class AdminCard extends Component {
    constructor(props) {
        super(props);

    }

    renderComponent = (type)=>{
        if(type==='users'){
            return <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    {
                        this.props.content.map(items=>(
                            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'space-evenly'}}>
                                <div>
                                    <Typography variant='h5'>{items.name}</Typography>
                                </div>
                                <div>
                                    <Typography>{items.value}</Typography>
                                </div>
                            </div>
                        ))
                    }
            </div>
        }
    }

    render() {
        return (
            <Card style={{backgroundColor:`${this.props.backgroundColor}`,color:'white'}}>
                <CardHeader
                 title={this.props.title}
                />
                <Divider/>
                <CardContent>
                    {this.renderComponent(this.props.type)}
                </CardContent>
                <CardActions style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                    <Button component={Link} to={this.props.route} variant='text' color='inherit' style={{textTransform:'capitalize'}}>
                        more
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default AdminCard;
