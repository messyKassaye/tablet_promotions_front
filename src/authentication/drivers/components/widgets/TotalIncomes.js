import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import authstyle from "../../../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CardActions from "@material-ui/core/CardActions";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {depositFetch} from "../../state/actions/depositActions";
import Skeleton from "@material-ui/lab/Skeleton";
class TotalIncomes extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.depositFetch()
    }

    render() {
        const {classes} = this.props
        const {t} = this.props
        return (
            <div>
                {
                    this.props.loading?
                        (
                            <Skeleton variant='rect' width='100%' height={150}/>
                        )
                        :(
                            <Card className={classes.card3}>
                                <CardContent>

                                    {
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {`${this.props.user.relations.balance.balance.toLocaleString()} ETB`}
                                        </Typography>
                                    }
                                    <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                        {t('driver.total_income.title')}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    <Button style={{color:'white',textTransform:'capitalize'}}>
                                        <span>{t('driver.more')}</span><ChevronRightIcon/>
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
    user: state.userData.user,
    loading: state.userData.loading
})

export default translate('common')(withStyles(authstyle)(connect(mapStateToProps,{depositFetch})(TotalIncomes)))
