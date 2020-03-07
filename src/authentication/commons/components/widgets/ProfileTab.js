import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../../style/usersStyle";
import {Button, Typography} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import RoomIcon from "@material-ui/icons/Room";
import {grey} from "@material-ui/core/colors";
class ProfileTab extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {classes} = this.props
        return (
            <div>
                <div className={classes.profileContainer}>
                    <div className={classes.profileRowCard}>
                        <Typography className={classes.profileRowFirstLabel}>
                            <MailOutlineIcon color={"primary"} style={{marginRight:10}}/> Email:
                        </Typography>
                        <Typography className={classes.profileRowSecondLabel}>{this.props.users.attribute.email}</Typography>
                    </div>

                    <div className={classes.profileRowCard}>
                        <Typography className={classes.profileRowFirstLabel}>
                            <PhoneIcon color={"primary"} style={{marginRight:10}}/> Phone:
                        </Typography>
                        <Typography className={classes.profileRowSecondLabel}>{this.props.users.attribute.phone}</Typography>
                    </div>

                    <div style={{marginTop:50}}>
                        <Typography className={classes.addressLabel}>
                            <RoomIcon fontSize={"small"} color={"primary"} style={{marginRight:10}}/>
                            Address
                        </Typography>
                        {
                            this.props.users.relations.address===null
                                ?
                                (
                                    <div className={classes.profileRowCard}>
                                        <Typography className={classes.profileRowFirstLabel}>Address is not assigned:</Typography>
                                        <Button
                                            color={"primary"}
                                            variant={"outlined"}
                                            size={"small"}
                                            style={{textTransform:"none"}}
                                        >Notify him to fill his/her address</Button>
                                    </div>
                                )
                                :
                                (
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <RoomIcon color={"primary"}/>
                                        <Typography>{`${this.props.users.relations.address.country}, ${this.props.users.relations.address.city}`}</Typography>
                                    </div>
                                )
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(userStyle)(ProfileTab);