import React, {Component} from 'react';
import {Card, CardContent, CardHeader} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import NewCompany from "../../advertisers/components/NewCompany";
import {connect} from "react-redux";
import {showMainDialog} from "../../admin/state/action/dialogAction";

class CompanyCard extends Component {

    constructor(props) {
        super(props);

    }

    edit = company=>{
        this.props.showMainDialog({
            show:true,
            page:<NewCompany form={{type:'Edit',data:company}}/>,
            title:`Edit your company`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.company.name}
                    subheader={<span style={{color:grey[500]}}>{`${this.props.company.adverts.length} adverts`}</span>}
                    avatar={<Avatar>{this.props.company.name[0]}</Avatar>}
                />
                <Divider/>
                <CardContent>
                    {
                        <Card elevation={0}>
                            <CardContent>
                                <Typography>{`Phone : ${this.props.company.phone}`}</Typography>
                                <Typography>Website: <a href={this.props.company.website} >{this.props.company.website}</a>
                                </Typography>
                                <div style={{display:'flex',marginTop:15,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                    <Typography>{`Total adverts: ${this.props.company.adverts.length}`}</Typography>
                                    <Button
                                        color='secondary'
                                        size='small'
                                        variant='outlined'
                                        disabled={this.props.company.adverts.length<=0}
                                        style={{textTransform:'none',marginLeft:10}}>
                                        show all
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    }
                </CardContent>
                <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',color:'white'}}>
                    <Button
                        color='secondary'
                        variant='outlined'
                        style={{textTransform:'none'}}>
                        Delete
                    </Button>
                    <Button
                        onClick={()=>this.edit(this.props.company)}
                        color='primary'
                        variant='contained'
                        style={{textTransform:'none'}}>
                        Edit
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default connect(null,{showMainDialog})(CompanyCard);