import React, {Component} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Table,
    TableBody, TableCell,
    TableRow,
    Typography,
    Chip, Avatar, CardActions,Button
} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'
import {fetchAdverts} from "../state/action/advertsAction";
import {showAdverts} from "../state/action/advertsAction";
import {connect} from "react-redux";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import {deepOrange, green} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import aboutAdvertStyle from "./styles/aboutAdvertStyle";
import MediaPlayer from "../../commons/components/MediaPlayer";
import {showMainDialog} from "../state/action/dialogAction";
import SingleLoading from "../../commons/loading/SingleLoading";

class AboutAdverts extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchAdverts()
    }


    identifyMedia = advert=>{
        if(advert.advert_media_type.name==='Video'){
            return 'Play video'
        }else if(advert.advert_media_type.name==='Audio'){
            return 'Play audio'
        }else {
            return 'Show image'
        }
    }

    showMedia = advert=>{
        this.props.showMainDialog({
            show:true,
            maxWidth:'md',
            page:<MediaPlayer adverts={advert}/>,
            title:`Advert media of ${advert.product_name}`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }


    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"md"}>
                <Grid item md={9} xs={12} sm={12}>
                    <Card elevation={0}>
                        <CardHeader
                            title={'About adverts'}
                            avatar={<VideocamIcon/>}
                        />
                        <CardContent>
                            {
                                this.props.loading
                                    ?
                                    (
                                        <Grid container spacing={2}>
                                           <SingleLoading height={200}/>
                                            <SingleLoading height={200}/>
                                            <SingleLoading height={200}/>
                                            <SingleLoading height={200}/>
                                        </Grid>
                                    )
                                    :
                                    (
                                        <Grid container spacing={2}>
                                            {
                                                this.props.adverts.length>0
                                                    ?
                                                    (
                                                        this.props.adverts.map(advert=>(
                                                            <Grid item md={12} xs={12} sm={12}>
                                                                <Card>
                                                                    <CardHeader
                                                                        title={advert.company.name}
                                                                        subheader={advert.product_name}
                                                                        avatar={
                                                                            <Avatar style={{backgroundColor:deepOrange[500],color:'white'}}>{advert.company.name.charAt(0)}</Avatar>
                                                                        }
                                                                    />
                                                                    <Divider/>
                                                                    <CardContent>
                                                                        <Table>
                                                                            <TableBody>
                                                                                <TableRow>
                                                                                    <TableCell className={classes.tableCell}>
                                                                                        Media type
                                                                                    </TableCell>
                                                                                    <TableCell className={classes.cellColor}>{advert.advert_media_type.name}</TableCell>
                                                                                </TableRow>

                                                                                <TableRow>
                                                                                    <TableCell className={classes.tableCell}>
                                                                                        Status
                                                                                    </TableCell>
                                                                                    <TableCell className={classes.cellColor}>{advert.status}</TableCell>
                                                                                </TableRow>

                                                                                <TableRow>
                                                                                    <TableCell className={classes.tableCell}>
                                                                                        Total Required view
                                                                                    </TableCell>
                                                                                    <TableCell className={classes.cellColor}>
                                                                                        <Chip
                                                                                            color={"primary"}
                                                                                            size={"medium"}
                                                                                            label={advert.required_views_number.toLocaleString()}
                                                                                        />

                                                                                    </TableCell>
                                                                                </TableRow>

                                                                                <TableRow>
                                                                                    <TableCell className={classes.tableCell}>
                                                                                        Current views
                                                                                    </TableCell>
                                                                                    <TableCell className={classes.cellColor}>
                                                                                        <Chip
                                                                                            color={"secondary"}
                                                                                            size={"medium"}
                                                                                            label={advert.current_view.toLocaleString()}
                                                                                        />

                                                                                    </TableCell>
                                                                                </TableRow>
                                                                                <TableRow>
                                                                                    <TableCell className={classes.tableCell}></TableCell>
                                                                                    <TableCell className={classes.cellColor}>
                                                                                        {
                                                                                            advert.media_path === 'not_assigned'
                                                                                            ?
                                                                                                (
                                                                                                    <Chip
                                                                                                     label={'Media is not uploaded'}
                                                                                                    />
                                                                                                )
                                                                                            :
                                                                                                (
                                                                                                    <Button
                                                                                                        color={"primary"}
                                                                                                        variant={"outlined"}
                                                                                                        style={{textTransform:'none'}}
                                                                                                        size={"small"}
                                                                                                        onClick={()=>this.showMedia(advert)}
                                                                                                    >
                                                                                                        {this.identifyMedia(advert)}
                                                                                                    </Button>
                                                                                                )
                                                                                        }
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            </TableBody>
                                                                        </Table>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                        ))
                                                    )
                                                    :
                                                    (
                                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                            <Typography>Advert is not found.</Typography>
                                                        </div>
                                                    )
                                            }
                                        </Grid>
                                    )
                            }
                        </CardContent>
                    </Card>
                </Grid>

            </Container>
        );
    }
}

const mapStateToProps = state=>({
    loading:state.authReducer.adminReducers.advertReducer.loading,
    adverts:state.authReducer.adminReducers.advertReducer.adverts,
    showAdverts:state.authReducer.adminReducers.advertReducer.showAdverts,
    showLoader:state.authReducer.adminReducers.advertReducer.showLoading
})

export default connect(mapStateToProps,{fetchAdverts,showAdverts,showMainDialog})
(withStyles(aboutAdvertStyle)(AboutAdverts));