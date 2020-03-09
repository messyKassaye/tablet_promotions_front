import React, {Component} from 'react';
import {Container, Grid, ButtonGroup, Button,
    Typography,Divider} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {showCarAdvert} from "../../state/actions/CommonCarAdvertAction";
import AdvertViewInImageCard from "./AdvertViewInImageCard";
import AdvertViewInMap from "./AdvertViewInMap";
import AdvertViewInGraph from "./AdvertViewInGraph";
import FourByFourSkeleton from "../../loading/customSkeleton";

class AdvertViewTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view:1
        }

    }

    componentDidMount() {
        this.props.showCarAdvert(this.props.advert.id)
    }

    handleClick = (value)=>{
       this.setState({
           view:value
       })
    }

    findView = ()=>{
        const viewId = this.state.view
        switch (viewId) {
            case 1:
                return <AdvertViewInImageCard carAdvert={this.props.carAdverts}/>
            case 2:
                return <AdvertViewInMap carAdvert={this.props.carAdverts}/>
            case 3:
                return <AdvertViewInGraph carAdvert={this.props.carAdverts}/>
            default:
                return <AdvertViewInImageCard carAdvert={this.props.carAdverts}/>

        }
    }

    render() {
        return (
            <Container maxWidth={"lg"}>
                <Grid container spacing={2}>

                    <Grid item md={12} xs={12} sm={12}>
                        <div
                            style={{display:"flex",
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'flex-end',
                                padding:10
                            }}
                        >
                                <Typography color={"primary"} style={{marginRight:25}}>
                                    Show in
                                </Typography>

                                <ButtonGroup size="small" aria-label="small outlined button group">
                                    <Button
                                        style={{textTransform:'none'}}
                                        onClick={()=>this.handleClick(1)}
                                    >
                                        Image
                                    </Button>
                                    <Button
                                        style={{textTransform:'none'}}
                                        onClick={()=>this.handleClick(2)}
                                    >
                                        Map
                                    </Button>
                                    <Button
                                        style={{textTransform:'none'}}
                                        onClick={()=>this.handleClick(3)}
                                    >
                                        Graph
                                    </Button>
                                </ButtonGroup>
                            </div>
                        <Divider/>
                    </Grid>
                </Grid>

                 {
                        this.props.loading
                        ?
                            (
                                <Grid container spacing={2}>
                                    <FourByFourSkeleton/>
                                </Grid>
                            )
                        :
                            (
                                this.findView()
                            )
                    }
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    carAdverts: state.authReducer.commonReducer.commonCarAdvertsReducer.carAdverts,
    loading:state.authReducer.commonReducer.commonCarAdvertsReducer.loading
})

export default connect(mapStateToProps,{showCarAdvert})
(AdvertViewTab);