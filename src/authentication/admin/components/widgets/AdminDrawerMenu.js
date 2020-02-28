import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import withStyles from "@material-ui/core/styles/withStyles";
import authstyle from "../../../auth_style";
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {translate} from "react-i18next";
import Collapse from "@material-ui/core/Collapse";
class AdminDrawerMenu extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}

    }

    handleClick( item ) {
        this.setState( prevState => (
            { [ item ]: !prevState[ item ] }
        ) )
    }

    handler( children ) {
        const { classes,t } = this.props
        const { state } = this
        return children.map( ( subOption ) => {
            if ( !subOption.children ) {
                return (
                    <div key={ subOption.name }>
                        <ListItem
                            button
                            component={Link}
                            to={subOption.route}
                            key={ subOption.name }>
                                <ListItemText
                                    inset
                                    primary={t(`common.admin_menu.${subOption.name}`)}/>
                        </ListItem>
                    </div>
                )
            }
            return (
                <div key={ subOption.name } style={{height:'100%'}}>
                    <ListItem
                        button
                        onClick={ () => this.handleClick( subOption.name ) }>
                        <ListItemText
                            inset
                            primary={ t(`common.admin_menu.${subOption.name }`)} />
                        { state[ subOption.name ] ?
                            <ExpandLess /> :
                            <ExpandMore />
                        }
                    </ListItem>
                    <Collapse

                        in={ state[ subOption.name ] }
                        timeout="auto"
                        unmountOnExit
                    >
                        { this.handler( subOption.children ) }
                    </Collapse>
                </div>
            )
        } )
    }
    render() {
        const {classes} = this.props
        const {t} = this.props
        return (
            <List style={{overflowY:'auto',backgroundColor:'#2B2B2B'}}>
                {this.props.menu.map((item) => (
                    item.children
                    ?
                        (
                            <div key={ item.name }>
                                <ListItem
                                    button
                                    onClick={ () => this.handleClick( item.name ) }
                                    className={classes.parent}>
                                    <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={t(`common.admin_menu.${item.name}`)}/>
                                    { this.state[ item.name ] ?
                                        <ExpandLess /> :
                                        <ExpandMore />
                                    }
                                </ListItem>
                                <Collapse
                                    className={classes.sub_menu}
                                    in={ this.state[ item.name ] }
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    { this.handler( item.children ) }
                                </Collapse>
                            </div>
                        )
                    :
                        (
                            <ListItem
                                button
                                component={Link}
                                to={item.route}
                                key={item.name}
                                className={classes.parent}>
                                <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>
                                <ListItemText primary={t(`common.admin_menu.${item.name}`)}/>
                            </ListItem>
                        )
                ))}
            </List>
        );
    }


}

export default translate('common')(withStyles(authstyle)(AdminDrawerMenu))
