import React, {Component} from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableRow, Chip, Button, Divider, Typography,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import advertCardStyle from "../style/advertCardStyle";
import {green, grey} from "@material-ui/core/colors";
import AdvertPaymentApproval from "../../admin/dialogs/component/AdvertPaymentApproval";
import {showMainDialog} from "../../admin/state/action/dialogAction";
import {connect} from "react-redux";
import MediaPlayer from "./MediaPlayer";
import {Link} from "react-router-dom";

class AdvertCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false
        }
    }


    play = () => {
        this.setState({
            play: true
        })
    }
    calculatePayment = (expectedViews, paymentPerView) => {
        return expectedViews * paymentPerView
    }

    showPaymentStatus = adverts => {
        this.props.showMainDialog({
            show: true,
            page: <AdvertPaymentApproval advert={adverts}/>,
            title: 'Payment status for advert',
            actions: {on: false, path: '', id: ''}
        })
    }

    identifyMedia = advert => {
        if (advert.media.name === 'Video') {
            return 'Play video'
        } else if (advert.media.name === 'Audio') {
            return 'Play audio'
        } else {
            return 'Show image'
        }
    }

    render() {
        const {classes} = this.props
        return (
            <Card>
                <CardHeader
                    title={this.props.advert.product_name}
                    subheader={<Typography component={Link}
                                           style={{textDecoration: 'none', color: grey[500], fontSize: 14}}
                                           to={`/auth/company/${this.props.advert.company.id}`}>{this.props.advert.company.name}</Typography>}
                    avatar={<Avatar>{this.props.advert.product_name.charAt(0)}</Avatar>}
                    action={this.props.headerAction}
                />
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Media type</TableCell>
                                <TableCell
                                    className={classes.customTableCell}>{this.props.advert.media.name}</TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell className={classes.tableCell}>Expected play</TableCell>
                                <TableCell
                                    className={classes.customTableCell}>{this.props.advert.required_views_number.toLocaleString()}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCell}>Total payment</TableCell>
                                <TableCell className={classes.customTableCell}>
                                    {`${this.calculatePayment(this.props.advert.required_views_number, this.props.advert.media.per_view_payment).toLocaleString()} ETB`}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCell}>Current views</TableCell>
                                <TableCell
                                    className={classes.customTableCell}>{this.props.advert.views.length}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCell}>Payment status</TableCell>
                                <TableCell className={classes.customTableCell}>
                                    {
                                        this.props.advert.payment === null
                                            ?
                                            (
                                                <Chip label={'Not payed'} size={"small"} color={"secondary"}/>
                                            )
                                            :
                                            (
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Chip
                                                        label={'payed'}
                                                        size={"small"}
                                                        style={{marginRight: 10}}/>
                                                    <Button
                                                        color={"primary"}
                                                        size={"small"}
                                                        variant={"outlined"}
                                                        style={{textTransform: 'none'}}
                                                        onClick={() => this.showPaymentStatus(this.props.advert)}
                                                    >
                                                        Show transaction
                                                    </Button>
                                                </div>
                                            )
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Divider/>
                    <div style={{display: "flex", flexDirection: 'column', alignItems: 'flex-end'}}>
                        {
                            this.props.advert.media_path === 'not_assigned'
                                ?
                                (
                                    <Typography color={"secondary"}>Media file is not uploaded</Typography>
                                )
                                :
                                (
                                    <Button
                                        color={"primary"}
                                        variant={"text"}
                                        size={"small"}
                                        style={{textTransform: 'none', marginTop: 10}}
                                        onClick={this.play}
                                    >
                                        {this.identifyMedia(this.props.advert)}
                                    </Button>
                                )
                        }
                    </div>
                    {
                        this.state.play
                            ?
                            (<MediaPlayer adverts={this.props.advert}/>)
                            :
                            (null)
                    }


                </CardContent>
            </Card>
        );
    }
}

export default connect(null, {showMainDialog})(withStyles(advertCardStyle)(AdvertCard));