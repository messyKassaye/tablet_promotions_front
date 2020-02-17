import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add'
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {usersColumn as columns} from "../data/columns";
import {StyledTableCell} from "./AdminAdverts";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {fetchUsers} from "../state/action/adminUsersAction";
import Grid from "@material-ui/core/Grid";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {showMainDialog} from "../state/action/dialogAction";
import UsersMoreInfo from "../dialogs/component/UsersMoreInfo";
import AddNewUser from "../dialogs/component/AddNewUser";

class AdminUsers extends Component {

    componentDidMount() {
        this.props.fetchUsers()
    }

    addNewUser = ()=>{
        this.props.showMainDialog({show:true,page: <AddNewUser/>,title: 'Add new user',actions:{on: false,path:'',id:''}})
    }
    moreInfo = user=>{
        this.props.showMainDialog({show:true,maxWidth:'lg',page:<UsersMoreInfo user={user}/>,
            title:`More information about ${user.first_name} ${user.last_name}`,actions:{on:false,path:'',id:''}})
    }

    render() {
        return (
            <Container>
                <Card>
                    <CardHeader
                     title={'Users'}
                     action={
                         <IconButton color='inherit' onClick={this.addNewUser}>
                             <AddIcon/>
                         </IconButton>
                     }
                    />
                    <Divider/>
                <CardContent style={{padding:0}}>
                        {
                            this.props.loading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <FourByFourSkeleton/>
                                    </Grid>
                                )
                            :
                                (
                                    <Paper style={{overflow:'auto',borderRadius:0}}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {columns.map(column => (
                                                    <StyledTableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{minWidth: column.minWidth}}
                                                    >
                                                        {column.label}
                                                    </StyledTableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                this.props.users.length>0
                                                ?
                                                    (
                                                        this.props.users.map(user=>(
                                                            <TableRow key={user.id}>
                                                                <TableCell align='left'>{`${user.first_name} ${user.last_name}`}</TableCell>
                                                                <TableCell align='left'>{user.phone}</TableCell>
                                                                <TableCell>{user.email}</TableCell>
                                                                <TableCell>
                                                                    {
                                                                        user.address===null
                                                                        ?
                                                                            (<span>Not included</span>)
                                                                        :
                                                                            (
                                                                                user.address.city
                                                                            )
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        user.role.map(role=>(
                                                                            <span>{role.name}</span>
                                                                        ))
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div>
                                                                        <Button
                                                                            onClick={()=>this.moreInfo(user)}
                                                                            style={{textTransform:'none'}}
                                                                            size='small'
                                                                            color='secondary'
                                                                            variant='outlined'>
                                                                            More info
                                                                        </Button>

                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )
                                                :
                                                    (
                                                        <TableRow>
                                                            <TableCell colSpan={5}>
                                                                <Typography>There is no registered users</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                            }
                                        </TableBody>
                                    </Table>
                                    </Paper>
                                )
                        }
                </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    users:state.authReducer.adminReducers.adminUsersReducers.users,
    loading:state.authReducer.adminReducers.adminUsersReducers.loading
})

export default connect(mapStateToProps,{fetchUsers,showMainDialog})(AdminUsers);
