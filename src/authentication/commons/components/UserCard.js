import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {grey} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import {Avatar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import CardContent from "@material-ui/core/CardContent";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../style/usersStyle";
class UserCard extends Component {
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

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(userStyle)(UserCard);