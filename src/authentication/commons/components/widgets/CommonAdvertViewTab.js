import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Divider, Grid, Typography} from "@material-ui/core";
import FourByFourSkeleton from "../../loading/customSkeleton";
import AdvertViewsInPlace from "./AdvertViewsInPlace";
import AdvertViewInGraph from "./AdvertViewInGraph";
import withStyles from "@material-ui/core/styles/withStyles";
import commonAdvertViewStyle from "../../style/commonAdvertViewStyle";
class CommonAdvertViewTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view:1
        }
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
                return <AdvertViewsInPlace views={this.props.views}/>
            case 2:
                return <span>In map</span>
            case 3:
                return <AdvertViewInGraph advertView={this.props.views}/>
            default:
                return <AdvertViewsInPlace advertView={this.props.views}/>

        }
    }

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Grid container spacing={2}>

                    <Grid item md={12} xs={12} sm={12}>
                        <div
                            className={classes.header}
                        >
                            <div style={{display:"flex",flexDirection:'row'}}>
                                <Typography style={{marginRight:50}}>
                                    {`Advert views for ${this.props.advert.product_name}`}
                                </Typography>
                            </div>
                            <div className={classes.buttonGroup}>
                                <Typography color={"primary"} style={{marginRight:25}}>
                                    Show in
                                </Typography>
                                <ButtonGroup size="small" aria-label="small outlined button group">
                                    <Button
                                        style={{textTransform:'none'}}
                                        onClick={()=>this.handleClick(1)}
                                    >
                                        Place
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

export default withStyles(commonAdvertViewStyle)(CommonAdvertViewTab);