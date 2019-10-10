import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import authstyle from "../../../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CardActions from "@material-ui/core/CardActions";
import {financeFetch} from "../../state/actions/financeActions";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
class CreditAndWithdrawal extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.financeFetch()
    }

    filterWithdrawal = (data)=>{
        let filteredData = data.filter(items=>{
           return  items.withdrawal >0
        })
        return filteredData
    }

    filterCredit = (data)=>{
        let filteredData = data.filter(items=>{
            return  items.credit >0
        })

        return filteredData
    }


    render() {
        const {classes} = this.props
        return (
            <div>
                {
                    this.props.loading?
                        (
                            <Skeleton variant='rect' width='100%' height={150}/>
                        )
                        :
                        (
                            <Card className={classes.card4}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Withdrawal and Credit
                                    </Typography>
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                            Credited: {`${this.filterCredit(this.props.finance).length} times`}
                                        </Typography>

                                        <Divider orientation='vertical' style={{height: 20, padding: 1, marginRight: 10,marginLeft:10,backgroundColor:'white'}}/>

                                        <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                            <span>Withdraw</span>: {`${this.filterWithdrawal(this.props.finance).length} times`}
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    <Button style={{color:'white',textTransform:'capitalize'}}>
                                        <span>More</span><ChevronRightIcon/>
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                }
            </div>
        );
    }


}

const mapStateToProps = state=>({
    finance:state.authReducer.driversReducers.financeData.finance,
    loading:state.authReducer.driversReducers.financeData.loading,

})

export default withStyles(authstyle)(connect(mapStateToProps,{financeFetch})(CreditAndWithdrawal))