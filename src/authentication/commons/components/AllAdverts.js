import React, {Component} from 'react';
import VideocamIcon from '@material-ui/icons/Videocam'
import {Card,CardHeader,CardContent,Container} from "@material-ui/core";
class AllAdverts extends Component {
    render() {
        return (
            <Container maxWidth={"lg"}>
                <Card>
                    <CardHeader
                        title={'All your adverts'}
                        style={{backgroundColor:'#3C4252',color:'white'}}
                        avatar={<VideocamIcon/>}/>
                    <CardContent>

                    </CardContent>
                </Card>
            </Container>
        );
    }
}

export default AllAdverts;