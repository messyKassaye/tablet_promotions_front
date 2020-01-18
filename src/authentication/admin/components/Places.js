import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container,IconButton,Divider} from "@material-ui/core";
import PlaceIcon from '@material-ui/icons/Place';
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from "../state/action/dialogAction";
import {connect} from "react-redux";
import AddNewPlace from "../dialogs/component/AddNewPlace";
class Places extends Component {

    addNewPlace = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewPlace/>,
            title:'Add new place',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    render() {
        return (
            <Container maxWidth='lg'>
                <Card>
                    <CardHeader
                     avatar={<PlaceIcon/>}
                     title={'Advertisement places'}
                     action={<IconButton onClick={this.addNewPlace}><AddIcon/></IconButton>}
                    />
                    <Divider/>
                    <CardContent>

                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({

})

export default connect(mapStateToProps,{showMainDialog})(Places);