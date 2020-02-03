import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import logo from '../../assets/logo.png'
import  MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Language from '@material-ui/icons/Language'
import {Button } from '@material-ui/core';
import useStyles from '../../styles/app_style'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Languages from "./languages";
import About from './About'
import Home from './Home'
import Contact from './Contact'
import Pricing from './Pricing'
import Login from './Login'
import Signup from './Signup'
import {Link,Switch,Route} from 'react-router-dom'
import Menus from './menu'
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import Flag from 'react-world-flags'
import i18next from "i18next";
import {translate} from "react-i18next";
import NotFound from "../../errors/NotFound";
import Footer from "./footer";
import ResetPassword from "./widgets/ResetPassword";

function HomeBar({t}) {
   const  classes = useStyles();
   const [open,setOpen] = React.useState(false)
    const [languageMenuOpen] = React.useState(true)
    const [anchorEl,setAnchorEl] = React.useState(null)
    const [selectedLanguage,setSelectedLanguage] = React.useState('EN')

   const handleToggle = (value)=>event=>{
       if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
           return;
       }
       setOpen(value)
   }

   const handleMenu = (event)=>{
        setAnchorEl(event.currentTarget)
   }
   const  closeMenu = (event)=>{
        console.log((event.target.value))
        setAnchorEl(null)
   }

   const handleListSelectedItem = (event,languages)=>{
       setAnchorEl(null)
       setSelectedLanguage(languages.code)
       i18next.changeLanguage(languages.code.toLowerCase())
       console.log(languages.code.toLowerCase())
   }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={handleToggle(false)}
            onKeyDown={handleToggle(false)}
        >
            <AppBar style={{'position':'relative'}}>
                <Toolbar color='primary'>
                    <h2>Tablet Promotions</h2>
                </Toolbar>
            </AppBar>

            <List>
                {Menus.map((items, index) => {
                    if(items.name==='Sign up'){

                            return (
                                <div key={index}>
                                    <Divider/>
                                    <Button
                                    color='primary'
                                    variant='contained'
                                    component={Link}
                                    to={items.to}
                                    style={{margin:'10px','width':'50%','position':'relative'}}
                                    >{t(`home.${items.name}`)}</Button>
                                </div>
                            )
                    }else{
                        return (
                            <ListItem button component={Link} to={items.to} key={items.name}>
                                <ListItemText primary={t(`home.${items.name}`)} />
                          </ListItem>
                        )
                    }
                })}
            </List>
        </div>
    );

   const  drawer = (
       <SwipeableDrawer
        open={open}
        onOpen={handleToggle(true)}
        onClose={handleToggle(false)}
        width='350'
       >
           {
               sideList('left')
           }
       </SwipeableDrawer>
   )
    return (
    <div className={classes.site_container}>
        <main className={classes.site_content}>
            {<div className={classes.grow}>
                <AppBar position='fixed' color='primary'>
                    <Toolbar>
                        <Link to='/'>
                            <img
                                alt='Tablet Promotions'
                                src={logo}
                                width='62' height='55'
                                className={classes.brandIcon}/>
                        </Link>
                        <div>
                            <IconButton
                                color='inherit'
                                edge='start'
                                className={classes.menuButton}
                                onClick={handleToggle(true)}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </div>
                        <h3>{t('home.app_name')}</h3>
                        <div className={classes.grow}/>

                        <IconButton
                            color='inherit'
                            edge='start'
                            aria-controls='language-menu'
                            aria-haspopup='true'
                            onClick={handleMenu}
                        >
                            <Language/>
                        </IconButton>
                        <Menu
                            id='language-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={closeMenu}
                        >
                            <List
                                component='nav'
                                aria-labelledby='nested-menu'
                                subheader={
                                    <ListSubheader>Choose your language</ListSubheader>
                                }
                            >
                                {
                                    Languages.map((item,index)=>(
                                        <div key={item.name}>
                                            <ListItem button style={{backgroundColor:'transparent'}}>
                                                <Flag code={item.code} height='48' width='48' className={classes.flags}/>
                                                <ListItemText primary={item.name}/>
                                            </ListItem>
                                            {
                                                item.language.map((language,index)=>(
                                                    <Collapse key={language.name} in={languageMenuOpen}>
                                                        <List component="div" disablePadding>
                                                            <ListItem button className={classes.nested} onClick={event=>handleListSelectedItem(event,language)}>
                                                                <ListItemText primary={language.name} />
                                                            </ListItem>
                                                        </List>
                                                    </Collapse>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </List>
                        </Menu>
                        <span className={classes.language}>{selectedLanguage}</span>
                        <div className={classes.showOnDesktop}>
                            {
                                Menus.map((items,index)=>{
                                        if(items.name!=='Home'){
                                            return (
                                                <Button key={items.name} variant={items.name==='Sign up'?'outlined':'text'}
                                                        component={Link} to={items.to} className={classes.buttons} color='inherit'>{t(`home.${items.name}`)}</Button>
                                            )
                                        }
                                    }
                                )
                            }
                        </div>
                    </Toolbar>
                </AppBar>
                {
                    drawer
                }
                <div className={classes.router}>
                    <Switch>
                        <Route path='/' component={Home} exact/>
                        <Route path='/about' component={About}/>
                        <Route path='/contact' component={Contact}/>
                        <Route path='/pricing' component={Pricing}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/signup' component={Signup}/>
                        <Route path={'/reset_password'} component={ResetPassword}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                </div>
            </div>
            }
        </main>
        <Footer/>
    </div>
    )
}

export  default translate('common')(HomeBar)
