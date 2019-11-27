import React from "react";
import {connect} from "react-redux";
import {Link,withRouter} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import {Menu} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import {me} from "../state/actions/usersActions";
import authstyle from "../auth_style";
import Skeleton from "@material-ui/lab/Skeleton";
import {logout} from "../../TokenService";

class DrawerProfile extends React.Component{
     constructor(props) {
         super(props)
         this.state = {
             anchorEl:null
         }
         this.handleOpenProfileSetting = this.handleOpenProfileSetting.bind(this)
         this.closeMenu = this.closeMenu.bind(this)
         this.logout = this.logout.bind(this)
     }

     handleOpenProfileSetting = (event)=>{
         this.setState({anchorEl:event.currentTarget})
     }

     closeMenu = (event)=>{
         this.setState({
             anchorEl:null
         })
     }

     componentDidMount() {
         this.props.me()
     }

     logout = ()=>{
         logout()
        setTimeout(()=>{
            this.props.history.push('/')
            window.location.reload()
        },1000)
     }

     render() {
         const {classes} = this.props;
         return (
             <div>
                 {
                  this.props.loading ?
                      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                          <Skeleton variant='circle' style={{backgroundColor:'white'}} width={40} height={40}/>
                          <Skeleton variant='rect' style={{backgroundColor:'white',marginLeft:10,borderRadius:5}} width={120} height={10} />
                          <Skeleton variant='circle' style={{backgroundColor:'white',marginLeft:10}} width={10} height={10}/>
                      </div>
                      :this.props.user.map(items=>(
                         <div key={items.type} className={classes.avatarLayout}>
                             {
                                 items.attribute.avator==='letter'
                                     ?
                                     <Avatar className={classes.avatarImage} alt='profile image' >{items.attribute.first_name[0]}</Avatar>
                                     :<Avatar className={classes.avatarImage} src={`${items.attribute.avator}`}></Avatar>


                             }
                             {
                                 <span>{`${items.attribute.first_name} ${items.attribute.last_name}`}</span>
                             }
                             <div style={{marginLeft:25,margin:0}}>
                                 <IconButton
                                     aria-controls='setting-profile'
                                     aria-haspopup='true'
                                     edge='end'
                                     onClick={this.handleOpenProfileSetting}
                                     color='inherit'>
                                     <ArrowDropDown/>
                                 </IconButton>
                                 <Menu
                                     id='setting-profile'
                                     anchorEl={this.state.anchorEl}
                                     keepMounted
                                     open={Boolean(this.state.anchorEl)}
                                     onClose={this.closeMenu}
                                 >
                                     <List
                                         component='nav'
                                         aria-labelledby='nested-menu'
                                     >
                                         <ListItem button component={Link} to='/settings'>
                                             <ListItemText primary='Setting'/>
                                         </ListItem>

                                         <ListItem button onClick={event=>this.logout(event)} >
                                             <ListItemText primary='Logout'/>
                                         </ListItem>
                                     </List>
                                 </Menu>
                             </div>
                         </div>
                     ))
                 }
             </div>
         );
     }

 }
const mapStateToProps = state=> ({
    user: state.userData.user,
    loading:state.userData.loading
})

 export default withRouter(withStyles(authstyle)(connect(mapStateToProps,{me})(DrawerProfile)))
