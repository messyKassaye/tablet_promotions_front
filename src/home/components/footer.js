import React from "react";
import footerStyle from "../styles/footerStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {Container,Grid,Typography} from "@material-ui/core";
class Footer extends React.Component{

    render() {
        const {classes} = this.props
        return (
            <div className={classes.footer}>
                <Container maxWidth={"md"}>
                    <Grid container spacing={2}>

                        <Grid item md={4} xs={12} sm={12}>
                            <div style={{display:'flex',flexDirection:'column',color:'white'}}>
                                <Typography>Find us</Typography>

                            </div>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <div style={{display:'flex',flexDirection:'column',color:'white'}}>
                                <Typography>Contact us</Typography>

                            </div>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <div style={{display:'flex',flexDirection:'column',color:'white'}}>
                                <Typography>Office address</Typography>

                            </div>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        );
    }

}
export default withStyles(footerStyle)(Footer)
