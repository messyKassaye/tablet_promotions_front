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
import {me} from "../../state/actions/usersActions";
import Skeleton from "@material-ui/lab/Skeleton";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {updateAdvert} from "../../admin/state/action/advertsAction";
import AddNewAdvert from "./AddNewAdvert";
class AdvertCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            formData:{
                'company_id':0,
                'product_name':'',
                'advertisement_media_type_id':0,
                'is_all_over_ethiopia':0,
                'media_path':'',
                'status':'',
                'require_views_number':0,
            },
            moveText:'Move to advert air',
            moveVariant: 'contained'
        }
    }
componentDidMount() {
        this.props.me()
}

    play = (advert) => {
        this.props.showMainDialog({
            show:true,
            page:<MediaPlayer adverts={this.props.advert}/>,
            title:`${advert.product_name} video is playing.`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }
    calculatePayment = (expectedViews, paymentPerView) => {
        return expectedViews * paymentPerView
    }

    showPaymentStatus = adverts => {
        this.props.showMainDialog({
            show: true,
            maxWidth:'lg',
            page: <AdvertPaymentApproval advert={adverts}/>,
            title: 'Payment status for advert',
            actions: {on: false, path: '', id: ''}
        })
    }

    identifyMedia = advert => {
        if (advert.advert_media_type.name === 'Video') {
            return 'Play video'
        } else if (advert.advert_media_type.name === 'Audio') {
            return 'Play audio'
        } else {
            return 'Show image'
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                submitted:false,
                loading:false,
                moveText:'Moved to advert air',
                moveVariant:'outlined'
            })
            window.location.reload()
        }
    }


    render() {
        const {classes} = this.props
        return (
            <Card>
                <CardHeader
                    title={
                        <Typography
                            className={classes.link}
                            component={Link}
                            to={
                                this.props.loading
                                ?
                                    (<Skeleton variant={"text"} width={100} style={{backgroundColor:grey[500]}}/>)
                                :
                                    (
                                        `/auth/${this.props.users.
                                            relations.role[0].name.toLowerCase()}/advert/${this.props.advert.id}`
                                    )
                            }
                        >
                            {this.props.advert.product_name}
                        </Typography>
                    }
                    subheader={<span>{this.props.advert.company.name}</span>}
                    avatar={<Avatar>{this.props.advert.product_name.charAt(0)}</Avatar>}
                    action={this.props.headerAction}
                />
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Media type</TableCell>
                                <TableCell
                                    className={classes.customTableCell}>
                                    <Typography color={"primary"}>
                                        {this.props.advert.advert_media_type.name}
                                    </Typography>
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell className={classes.tableCell}>Expected play</TableCell>
                                <TableCell className={classes.customTableCell}>
                                    <Typography color={"primary"}>
                                        {this.props.advert.required_views_number.toLocaleString()}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCell}>Total payment</TableCell>
                                <TableCell className={classes.customTableCell}>
                                    <Typography color={"primary"}>
                                        {`${this.calculatePayment(this.props.advert.required_views_number, this.props.advert.advert_media_type.per_view_payment).toLocaleString()} ETB`}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCell}>Current views</TableCell>
                                <TableCell className={classes.customTableCell}>
                                    <Typography color={"primary"}>
                                        {this.props.advert.views.length.toLocaleString()}
                                    </Typography>
                                </TableCell>
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
                                        onClick={()=>this.play(this.props.advert)}
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
const mapStateToProps = state=>({
    users:state.userData.user,
    loading:state.userData.loading,
    response:state.authReducer.adminReducers.advertReducer.response
})
export default connect(mapStateToProps, {me,updateAdvert,showMainDialog})(withStyles(advertCardStyle)(AdvertCard));