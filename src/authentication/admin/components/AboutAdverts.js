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
class AboutAdverts extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchAdverts()
    }


    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"md"}>
                <Card>
                    <CardHeader
                        style={{backgroundColor:'#3C4252',color:'white'}}
                     title={'About adverts'}
                     avatar={<VideocamIcon/>}
                    />
                    <Divider/>
                    <CardContent>
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
                                    <Grid container spacing={2}>
                                        {
                                            this.props.adverts.length>0
                                            ?
                                                (
                                                    this.props.adverts.map(advert=>(
                                                        <Grid item md={6} xs={12} sm={12}>
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

export default connect(mapStateToProps,{fetchAdverts,showAdverts})
(withStyles(aboutAdvertStyle)(AboutAdverts));