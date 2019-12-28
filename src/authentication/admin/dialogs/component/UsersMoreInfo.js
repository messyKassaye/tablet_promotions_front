import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import VideocamIcon from '@material-ui/icons/Videocam'
import PersonIcon from '@material-ui/icons/Person'
import GridList from "@material-ui/core/GridList";
import userInfoStyle from "../styles/userInfoStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import GridListTile from "@material-ui/core/GridListTile";
import default_avator from '../../../../assets/default_avator.jpg'
class UsersMoreInfo extends Component {

    profile = ()=>{
        return <Grid item md={6} xs={12}>
            <Card elevation={0}>
                <CardHeader
                    avatar={<PersonIcon/>}
                    title={'Profile'}
                />
                <CardContent style={{display:'flex',flexDirection:'row'}}>
                    <img  style={{width:'150px',height:'150px'}} src={this.props.user.avatar==='letter'?default_avator:this.props.user.avatar} />
                    <div style={{display:"flex",flexDirection:'column'}}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Role:</TableCell>
                                    <TableCell>{this.props.user.role[0].name}</TableCell>
                                </TableRow>
                                <TableRow style={{borderBottom:0}}>
                                    <TableCell>Full name:</TableCell>
                                    <TableCell>{`${this.props.user.first_name} ${this.props.user.last_name}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Phone No:</TableCell>
                                    <TableCell>{this.props.user.phone}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email:</TableCell>
                                    <TableCell align={'center'}>{this.props.user.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Address:</TableCell>
                                    <TableCell>
                                        {
                                            this.props.user.address===null
                                                ?
                                                (
                                                    <span>Not assigned</span>
                                                )
                                                :
                                                (
                                                    <Typography>{`${this.props.user.address.country}, ${this.props.user.address.city}`}</Typography>
                                                )
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    }

    handleInformation = id=>{
        if(id===2){
           return  this.handleDriverInfo()
        }
    }

    handleDriverInfo = ()=>{
        const {classes} = this.props
        return <Grid md={6} xs={12}>
            <Grid container spacing={2}>

                <Grid item md={12} xs={12}>
                    <Card elevation={0}>
                        <CardHeader
                            avatar={<DirectionsCarIcon/>}
                            title={'Cars'}
                            subheader={`${this.props.user.cars.length} cars`}
                        />
                    <CardContent>
                        <GridList className={classes.gridList}>
                        {
                            this.props.user.cars.map(car=>(
                                <GridListTile className={classes.box}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Place number:</TableCell>
                                            <TableCell>{car.plate_number}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Car category:</TableCell>
                                            <TableCell>{car.car_category[0].name}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Total adverts:</TableCell>
                                            <TableCell>{car.adverts.length}</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </GridListTile>
                            ))
                        }
                        </GridList>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item md={12} xs={12}>
                    <Card elevation={0}>
                        <CardHeader
                            avatar={<VideocamIcon/>}
                            title={'Adverts'}
                        />

                    </Card>
                </Grid>
            </Grid>
        </Grid>
    }
    render() {
        return (
            <Grid container spacing={2}>

                {
                    /* Users profile */
                    this.profile()

                }

                {
                    /* Users detail information */
                    this.handleInformation(this.props.user.role[0].id)
                }

            </Grid>
        );
    }
}

export default withStyles(userInfoStyle)(UsersMoreInfo);
