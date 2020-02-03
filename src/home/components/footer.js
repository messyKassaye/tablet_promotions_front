import React from "react";
import footerStyle from "../styles/footerStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";
class Footer extends React.Component{

    render() {
        const {classes} = this.props
        return (
            <div className={classes.footer}>
                <Container maxWidth={"lg"}>

                </Container>
            </div>
        );
    }

}
export default withStyles(footerStyle)(Footer)
