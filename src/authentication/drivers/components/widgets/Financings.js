import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import authstyle from "../../../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CardActions from "@material-ui/core/CardActions";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
class Financings extends React.Component{

    constructor(props) {
        super(props);

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
                                        withdrawal and credit
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                        withdraw: 2 times
                                    </Typography>
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
    finance:state.financeData.finance,
    loading:state.financeData.loading
})

export default withStyles(authstyle)(connect(mapStateToProps)(Financings))