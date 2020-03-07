import React, {Component} from 'react';
import {
    Card, CardHeader, CardContent, Divider, Grid, Button
    , Container, InputBase, Menu, MenuItem, Typography
} from "@material-ui/core";
import {fetchUsers} from "../state/action/adminUsersAction";
import {showMainDialog} from "../state/action/dialogAction";
import AddNewUser from "../dialogs/component/AddNewUser";
import SingleLoading from "../../commons/loading/SingleLoading";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchIcon from '@material-ui/icons/Search'
import UserCard from "../../commons/components/UserCard";
import userStyle from "../../commons/style/usersStyle";
import {connect} from "react-redux";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import UsersLoader from "../../commons/loading/UsersLoader";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
class AdminUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            anchorEl:null,
            name:'',
            showing:'all',
            users:[]
        }
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.users){
            this.setState({
                users:nextProps.users
            })
        }
    }

    showUser = type=>{
        this.setState({
            users:this.filterUsers(type)
        })
    }

    filterUsers = role=>{
        if(role==='all'){
            return this.props.users
        }else{
            return this.props.users.filter(user=>{
                return user.role[0].name===role
            })
        }
    }

    addNewUser = ()=>{
        this.props.showMainDialog({show:true,page: <AddNewUser/>,title: 'Add new user',actions:{on: false,path:'',id:''}})
    }

     handleClick = event => {
        this.setState({
            anchorEl:event.currentTarget,
            [event.target.name]: event.target.value
        })
    };


    handleClose = (event) => {
        this.setState({
            anchorEl:null,
            showing:event.target.getAttribute('name')
        })
      this.showUser(event.target.getAttribute('name'))
    };

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"md"}>
                <Grid container spacing={2}>
                    <Grid item md={9} xs={12} sm={12}>
                      <Card elevation={0}>
                          <CardHeader
                           title={
                               <div className={classes.search}>
                                   <div className={classes.searchIcon}>
                                       <SearchIcon />
                                   </div>
                                   <InputBase
                                       placeholder="Search…"
                                       classes={{
                                           root: classes.inputRoot,
                                           input: classes.inputInput,
                                       }}
                                       inputProps={{ 'aria-label': 'search' }}
                                   />
                               </div>
                           }
                           action={
                               <div>
                                   <Button
                                       aria-controls="simple-menu"
                                       color={"primary"}
                                       variant={"text"}
                                       aria-haspopup="true"
                                       style={{textTransform:'none'}}
                                       onClick={this.handleClick}>
                                       {`Showing  ${this.state.showing}`}
                                       <ArrowDropDownIcon color={"inherit"}/>
                                   </Button>
                                   <Menu
                                       id="simple-menu"
                                       anchorEl={this.state.anchorEl}
                                       keepMounted
                                       open={Boolean(this.state.anchorEl)}
                                       onClose={this.handleClose}
                                   >
                                       <MenuItem name={'all'} onClick={this.handleClose}>Show all</MenuItem>
                                       <MenuItem name={'Advertiser'} onClick={this.handleClose}>Show advertisers</MenuItem>
                                       <MenuItem name={'Driver'} onClick={this.handleClose}>Show drivers</MenuItem>
                                       <MenuItem name={'Down loader'} onClick={this.handleClose}>Show downloader</MenuItem>
                                   </Menu>
                               </div>
                           }
                          />
                          <Divider/>
                          <CardContent>
                              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                                  {
                                      this.props.loading
                                      ?
                                          (
                                              <Skeleton variant={"text"} width={150} style={{backgroundColor:grey[500]}}/>
                                          )
                                      :
                                          (
                                              <Typography style={{color:grey[500]}}>{`${this.state.users.length} users`}</Typography>
                                          )
                                  }
                              </div>
                              {
                                  this.props.loading||this.state.users.length<=0
                                  ?
                                      (
                                          <Grid container spacing={2}>
                                              <Grid item md={12} xs={12} sm={12}>
                                                  <UsersLoader/>
                                              </Grid>
                                              <Grid item md={12} xs={12} sm={12}>
                                                  <UsersLoader/>
                                              </Grid>
                                              <Grid item md={12} xs={12} sm={12}>
                                                  <UsersLoader/>
                                              </Grid>
                                              <Grid item md={12} xs={12} sm={12}>
                                                  <UsersLoader/>
                                              </Grid>
                                          </Grid>
                                      )
                                  :
                                      (
                                          <Grid container spacing={2}>
                                              {
                                                  this.state.users.map(user=>(
                                                      <Grid key={user.id} item md={12} xs={12} sm={12}>
                                                          <UserCard user={user}/>
                                                      </Grid>
                                                  ))
                                              }
                                          </Grid>
                                      )
                              }
                          </CardContent>
                      </Card>
                    </Grid>

                    <Grid item md={3} xs={12} sm={12}>
                        <Button
                            color={"primary"}
                            variant={"outlined"}
                            style={{textTransform:'none',position:'fixed'}}
                            onClick={this.addNewUser}
                        >
                            Add new user
                        </Button>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}

const mapStateToProps = state=>({
    users:state.authReducer.adminReducers.adminUsersReducers.users,
    loading:state.authReducer.adminReducers.adminUsersReducers.loading
})

export default connect(mapStateToProps,{fetchUsers,showMainDialog})
(withStyles(userStyle)(AdminUsers));
