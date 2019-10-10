import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Language from '@material-ui/icons/Language'
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Menu from "@material-ui/core/Menu";
import Languages from "../../home/components/languages";
import ListItem from "@material-ui/core/ListItem";
import Flag from "react-world-flags";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import i18next from "i18next";
import authstyle from "../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
class LanguageSetter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl:null,
            languageMenuOpen:true,
            selectedLanguage:"EN"
        }

        this.handleMenu = this.handleMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)

    }

    handleMenu = (event)=>{
        this.setState({
            anchorEl:event.currentTarget
        })
    }

    closeMenu = (event)=>{
        this.setState({
            anchorEl:null
        })
    }

    handleListSelectedItem = (event,languages)=>{
        this.setState({
            anchorEl:null,
            selectedLanguage:languages.code
        })
        i18next.changeLanguage(languages.code.toLowerCase())
        console.log(languages.code.toLowerCase())
    }

    render() {
        const  classes =this.props
        return (
            <div>
                <IconButton
                color='inherit'
                aria-controls='language-menu'
                aria-label='language changer'
                aria-haspopup='true'
                onClick={this.handleMenu}
                >
                    <Language/>
                </IconButton>
                <Menu
                    id='language-menu'
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.closeMenu}
                >
                    <List
                        component='nav'
                        aria-labelledby='nested-menu'
                        subheader={
                            <ListSubheader>Choose your language</ListSubheader>
                        }
                    >{
                        Languages.map((item,index)=>(
                            <div key={item.name}>
                                <ListItem button style={{backgroundColor:'transparent'}}>
                                    <Flag style={{marginRight:20}} code={item.code} height='48' width='48' className={classes.flags}/>
                                    <ListItemText  primary={item.name}/>
                                </ListItem>
                                {
                                    item.language.map((language,index)=>(
                                        <Collapse key={language.name} in={this.state.languageMenuOpen}>
                                            <List component="div" disablePadding>
                                                <ListItem button className={classes.nested} onClick={event=>this.handleListSelectedItem(event,language)}>
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
                <span className={classes.language}>{this.state.selectedLanguage}</span>
            </div>
        );
    }

}

export default withStyles(authstyle)(LanguageSetter)