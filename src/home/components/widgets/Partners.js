import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Typography} from "@material-ui/core";
import {connect} from "react-redux";

class Partners extends Component {
    render() {
        return (
            <Container maxWidth={"lg"} style={{marginTop:10,marginBottom:20}}>
                <Card>
                    <CardContent>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <Typography variant={"h4"}>Our partners</Typography>
                        </div>

                    </CardContent>
                </Card>
            </Container>
        );
    }
}

export default Partners;