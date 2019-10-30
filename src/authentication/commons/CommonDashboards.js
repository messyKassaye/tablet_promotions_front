import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DrawerProfile from "./DrawerProfile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo_2 from "../../assets/logo_2.png";
import Typography from "@material-ui/core/Typography";
import LanguageSetter from "./LanguageSetter";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Hidden from "@material-ui/core/Hidden";
import {SwipeableDrawer} from "@material-ui/core";
import theme from "../../themes/app_theme";
import authstyle from "../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
import {translate} from "react-i18next";
import {connect} from "react-redux";
import {me} from "../state/actions/usersActions";
import Dashboard from "../advertisers/components/Dashboard";
import NestedRoute from "../advertisers/components/NestedRoute";
import Paper from "@material-ui/core/Paper";

class CommonDashboards extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false,
            currentPage:'Dashboard'
        }
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)

    }


    handleDrawerToggle = (value,page) => event=>{
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            mobileOpen: value,
            currentPage:page
        })
    }

    componentDidMount() {
        this.props.me()
    }

    renderComponent = ()=>{
        if(this.props.type==='Advertiser'){
            return <NestedRoute/>
        }
    }


    render() {
        const {container} = this.props;
        const {classes} = this.props;
        const {t} = this.props
        const drawer = (
            <div className={classes.drawerRoot}>
                <AppBar style={{position: "relative", backgroundColor: '#1E221E'}}>
                    <Toolbar style={{padding: 5}}>
                        <DrawerProfile/>
                    </Toolbar>
                </AppBar>

                <List>
                    {this.props.menu.map((item) => (
                        <ListItem
                            button
                            component={Link}
                            to={item.route}
                            key={item.name}
                            onClick={this.handleDrawerToggle(false,item.name)}
                            className={classes.parent}>
                            <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={t(`common.advertiser_menu.${item.name}`)}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </div>
        )
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar} color='primary'>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={this.handleDrawerToggle(true)}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Link to='/' className={classes.logo}>
                            <img
                                alt='Tablet Promotions'
                                src={logo_2}
                                width='32' height='32'
                                className={classes.brandIcon}/>
                        </Link>
                        <Typography className={classes.app_name}>{t('home.app_name')}</Typography>
                        <div className={classes.grow}/>
                        <LanguageSetter/>
                        <Notifications/>
                        <div className={classes.profile}>
                            <Profile/>
                        </div>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <SwipeableDrawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}

                            onOpen={this.handleDrawerToggle(true,this.state.currentPage)}
                            onClose={this.handleDrawerToggle(false,this.state.currentPage)}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <SwipeableDrawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open={this.state.mobileOpen}
                            onOpen={this.handleDrawerToggle(true,this.state.currentPage)}
                            onClose={this.handleDrawerToggle(false,this.state.currentPage)}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {
                      this.renderComponent()
                    }
                </main>
            </div>
        )
    }

}
const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading
})

export default withStyles(authstyle)(translate('common')(connect(mapStateToProps,{me})(CommonDashboards)))