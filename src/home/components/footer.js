import React from "react";
import footerStyle from "../styles/footerStyle";
import withStyles from "@material-ui/core/styles/withStyles";
class Footer extends React.Component{

    render() {
        const {classes} = this.props
        return (
            <div className={classes.footer}>Footer</div>
        );
    }

}
export default withStyles(footerStyle)(Footer)
