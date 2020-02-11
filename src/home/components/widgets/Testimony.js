import React, {Component} from 'react';
import {Card, CardContent, Container, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CategoriesStyle from "../styles/CategorieStyle";
class Testimony extends Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.categories}>
                <Container maxWidth={"md"} style={{marginTop:10,marginBottom:20}}>
                    <Card elevation={0} style={{backgroundColor:'transparent'}}>
                        <CardContent className={classes.mainContent}>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <Typography variant={"h4"}>Testimonies</Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withStyles(CategoriesStyle)(Testimony);