 import React from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationIcon from '@material-ui/icons/Notifications'
 import withStyles from "@material-ui/core/styles/withStyles";
 import Badge from "@material-ui/core/Badge/Badge";
class Notifications extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const StyledBadge1 = withStyles(theme => ({
            badge: {
                right: -3,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
            },
        }))(Badge);
        return (
            <div style={{marginLeft:25}}>
                <IconButton
                color='inherit'
                >
                    <StyledBadge1 badgeContent={4} color="secondary">
                        <NotificationIcon/>
                    </StyledBadge1>
                </IconButton>
            </div>
        );
    }

}
export default Notifications