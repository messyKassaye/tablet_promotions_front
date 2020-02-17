import React, {Component} from 'react';
import {
    Card, CardContent, CardHeader,Button,
    Container, Divider, IconButton, Grid, Avatar, Typography, CardActions
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from "../state/action/dialogAction";
import {connect} from "react-redux";
import {fetchRole} from "../state/action/roleAction";
import AddNewRole from "../dialogs/component/AddNewRole";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import {deepOrange, green} from "@material-ui/core/colors";
import DeleteMessage from "../dialogs/component/DeleteMessage";
class Role extends Component {

    addNewRole = ()=>{
        this.props.showMainDialog({'show':true,'page':<AddNewRole form={{type:'NewRole',data:''}}/>,title: 'Add new role',
            actions: {on:false,path:'',id:''}})
    }

    componentDidMount() {
        this.props.fetchRole()
    }

    handleButtonClick = (component,titles,action)=>{
        this.props.showMainDialog({'show':true,'page':component,title: titles,actions:action})
    }

    render() {
        return (
            <Container maxWidth='lg'>
                <Card>
                    <CardHeader
                     title={'Roles'}
                     action={
                         <IconButton color='primary' onClick={this.addNewRole}>
                             <AddIcon/>
                         </IconButton>
                     }
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={2}>
                            {
                                this.props.loading
                                ?
                                    (<FourByFourSkeleton/>)
                                :
                                    (
                                        this.props.roles.map(role=>(
                                            <Grid key={role.id} item md={4} xs={12}>
                                                <Card style={{backgroundColor:green[500],color:'white'}}>
                                                    <CardHeader
                                                        avatar={<Avatar>{role.name[0]}</Avatar>}
                                                        title={role.name}
                                                    />
                                                    <Divider/>
                                                    <CardContent>
                                                        <Typography variant='h5'>
                                                            {`Total users: ${role.user.length}`}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions style={{display:'flex',justifyContent:'flex-end'}}>

                                                        <Button
                                                            color='inherit'
                                                            variant='text'
                                                            style={{textTransform:'none'}}
                                                            onClick={()=>this.handleButtonClick(
                                                                <DeleteMessage message={`Are you sure. you want to remove ${role.name}`}/>,
                                                                'Confirmation',
                                                                {on:true,path:`roles`,id:role.id}
                                                            )}
                                                        >
                                                            Remove
                                                        </Button>
                                                        <Button
                                                         color='inherit'
                                                         variant='outlined'
                                                         onClick={()=>this.handleButtonClick(<AddNewRole form={{type:'Edit',data:role}}/>,`Edit ${role.name}`,role)}
                                                         style={{textTransform:'none'}}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    )
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    roles:state.authReducer.adminReducers.roleReducer.role,
    loading:state.authReducer.adminReducers.roleReducer.loading
})
export default connect(mapStateToProps,{fetchRole,showMainDialog})(Role);
