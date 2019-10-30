import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import authstyle from "../auth_style";
import Badge from '@material-ui/core/Badge';
import Skeleton from "@material-ui/lab/Skeleton";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {Menu} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
class Profile  extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            anchorEl:null
        }
        this.handleMenu = this.handleMenu.bind(this)
    }
    handleMenu = (event)=>{
        this.setState({
            anchorEl:event.currentTarget
        })
    }

    closeMenu = (event)=>{
        this.setState({
            anchorEl: null
        })
    }

    render() {
        const  classes = this.props
        return (
            <div >
                {
                    this.props.loading
                    ?
                        (<Skeleton variant='circle' width={40} height={40}/>)
                    :
                        (
                            <IconButton
                                color='inherit'
                                aria-controls='profile-menu'
                                aria-label='Profile menu'
                                aria-haspopup='true'
                                onClick={this.handleMenu}
                            >
                                {
                                    this.props.user.map(user=>{
                                        if(user.attribute.avator==='letter'){
                                            return <Avatar key={user.attribute.id} style={{margin:1,width:25,height:25}}>{user.attribute.first_name[0]}</Avatar>
                                        }else {
                                           return <Avatar key={user.attribute.id} src={user.attribute.avator} style={{margin:1,width:30,height:30}}></Avatar>
                                        }
                                    })
                                }
                            </IconButton>
                        )
                }
                <Menu
                 id='profile-menu'
                 anchorEl={this.state.anchorEl}
                 open={Boolean(this.state.anchorEl)}
                 keepMounted
                 onClose={this.closeMenu}
                >
                    <List
                    component='nav'
                    aria-labelledby='nested menu'
                    >
                        <ListItem button>
                            <ListItemText primary='Setting'/>
                        </ListItem>

                        <ListItem button>
                            <ListItemText primary='Logout'/>
                        </ListItem>

                    </List>

                </Menu>
            </div>
        );
    }

}

const mapStateToProps = state=> ({
    user: state.userData.user,
    loading:state.userData.loading
})

export default withStyles(authstyle)(connect(mapStateToProps)(Profile))