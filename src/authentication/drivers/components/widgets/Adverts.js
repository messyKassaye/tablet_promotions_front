import React from "react";
import {connect} from "react-redux";
import {me} from "../../../state/actions/usersActions";
import withStyles from "@material-ui/core/styles/withStyles";
import advertsStyle from "../../style/adverts";
import {CircularProgress} from "@material-ui/core";
import TodaysAdvert from "./smallDevices/TodaysAdvert";
import Grid from "@material-ui/core/Grid";
import WeeksAd from "./smallDevices/WeeksAd";
import TotalAds from "./smallDevices/TotalAds";
import AdvertInTable from "./advertInTable";

class Adverts extends React.Component{

    constructor(props) {
        super(props);
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)


    }

     handleChangePage = (event, newPage) => {

    };

     handleChangeRowsPerPage = event => {
         const {rowsPerPage} = this.state
         [rowsPerPage]+event.target.value
         this.setState(rowsPerPage)
         this.setState({
             rowsPerPage
         })
    };

    componentDidMount() {
        this.props.me()


    }

    render() {
        const {classes} = this.props
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <CircularProgress/>
                            </div>
                        )
                    :
                        (
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12}>
                                    {
                                        <TodaysAdvert  today={this.props.user.helpers.today_date} cars={this.props.user.relations.cars}/>

                                    }
                                </Grid>

                                <Grid item md={12} xs={12}>
                                    {
                                        <WeeksAd cars={this.props.user.relations.cars}/>
                                    }
                                </Grid>

                                <Grid item md={12} xs={12}>
                                    {
                                        <TotalAds cars={this.props.user.relations.cars}/>
                                    }
                                </Grid>

                                <Grid item md={12} xs={12} className={classes.big_device}>
                                        <AdvertInTable/>
                                </Grid>
                            </Grid>
                        )
                }
            </div>
        );
    }

}

const mapStateToProps = state=> ({
    user: state.userData.user,
    loading:state.userData.loading
})

export default withStyles(advertsStyle)(connect(mapStateToProps,{me})(Adverts))
