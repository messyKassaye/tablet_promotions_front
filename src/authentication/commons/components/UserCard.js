import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {grey} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import {Avatar} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import CardContent from "@material-ui/core/CardContent";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../style/usersStyle";
import Button from "@material-ui/core/Button";
import {showMainDialog} from "../../admin/state/action/dialogAction";
import {connect} from "react-redux";
import AddNewUser from "../../admin/dialogs/component/AddNewUser";
import UsersCompany from "./widgets/UsersCompany";
class UserCard extends Component {

    showCompany = (user,company)=>{
        this.props.showMainDialog({show:true,page: <UsersCompany company={company}/>,title: `Companies of ${user.first_name}`,actions:{on: false,path:'',id:''}})
    }
    render() {
        const {classes} = this.props


        return (
            <Card>
                <CardHeader
                    title={
                        <Typography
                            component={Link}
                            to={`/auth/admin/user/${this.props.user.id}`}
                            className={classes.link}
                        >
                            {`${this.props.user.first_name} ${this.props.user.last_name}`}
                        </Typography>
                    }
                    subheader={
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <span style={{color:grey[500],marginBottom:5}}>{this.props.user.role[0].name}</span>
                            <Divider/>
                        </div>
                    }
                    avatar={
                        <div>
                            {
                                this.props.user.avator==='letter'
                                    ?
                                    (
                                        <Avatar >{this.props.user.first_name.charAt(0)}</Avatar>
                                    )
                                    :
                                    (
                                        <Avatar src={this.props.user.avator}/>
                                    )
                            }
                        </div>
                    }
                />
                <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Email</TableCell>
                                <TableCell className={classes.customTableCell}>
                                   <Typography color={"primary"}>
                                       {this.props.user.email}
                                   </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCell}>Phone</TableCell>
                                <TableCell className={classes.customTableCell}>
                                    <Typography color={"primary"}>
                                        {this.props.user.phone}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCell}>Address</TableCell>
                                {
                                    this.props.user.address===null
                                    ?
                                        (
                                            <TableCell className={classes.customTableCell}>
                                                Not registered
                                            </TableCell>
                                        )
                                    :
                                        (
                                            <TableCell className={classes.customTableCell}>
                                                <Typography color={"primary"}>
                                                    {`${this.props.user.address.country}, ${this.props.user.address.city}`}
                                                </Typography>
                                            </TableCell>
                                        )

                                }
                            </TableRow>
                            {
                                this.props.user.role[0].id===2||this.props.user.role[0].id===4
                                ?
                                    (
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Cars</TableCell>
                                            {
                                                this.props.user.cars.length>0
                                                ?
                                                    (
                                                        <TableCell className={classes.customTableCell}>
                                                            <Typography color={"primary"}>
                                                                {this.props.user.cars.length}
                                                            </Typography>
                                                            <Button
                                                                variant={"text"}
                                                                size={"small"}
                                                                color={"secondary"}
                                                                style={{textTransform:'none',marginLeft:15}}
                                                            >
                                                                Show cars
                                                            </Button>
                                                        </TableCell>
                                                    )
                                                :
                                                    (
                                                        <TableCell className={classes.customTableCell}>
                                                            Car is not registered
                                                        </TableCell>
                                                    )
                                            }
                                        </TableRow>
                                    )
                                :
                                    (
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Company</TableCell>
                                            {
                                                this.props.user.company.length>0
                                                ?
                                                    (
                                                        <TableCell className={classes.customTableCell}>
                                                            <Typography color={"primary"}>
                                                                {this.props.user.company.length}
                                                            </Typography>
                                                            <Button
                                                                onClick={()=>this.showCompany(this.props.user,this.props.user.company)}
                                                                variant={"text"}
                                                                size={"small"}
                                                                color={"secondary"}
                                                                style={{textTransform:'none',marginLeft:15}}
                                                            >
                                                                Show company
                                                            </Button>
                                                        </TableCell>
                                                    )
                                                :
                                                    (
                                                        <TableCell className={classes.customTableCell}>
                                                           Company is not registered
                                                        </TableCell>
                                                    )
                                            }
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state=>({

})

export default connect(null,{showMainDialog})(withStyles(userStyle)(UserCard));