import React from "react";
import {setAdvertStatus} from "../../state/action/advertAction";
import {connect} from "react-redux";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import bankTransactionStyle from "../../styles/bankTransactions";
import withStyles from "@material-ui/core/styles/withStyles";
import {translate} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";
import {withRouter} from 'react-router-dom'
class BankTransactions extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.setAdvertStatus(false)

    }

    redirect = ()=>{
        this.props.history.push('/my_adverts')
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.advert===''){
            this.props.history.push('/new_advert')
        }
    }

    render() {
        const {t} = this.props
        const {classes} = this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={t('advertiser.bank_transaction.title')}
                    />
                    <CardContent>
                        {
                            this.props.loading
                            ?
                                (
                                    this.redirect()
                                )
                            :
                                (
                                    <div className={classes.content}>
                                        <Typography variant='h6' style={{color:green[500]}}>

                                            {`${t('advertiser.bank_transaction.upload_succeed')}${this.props.advert.product_name}
                                 ${t('advertiser.bank_transaction.be')}${this.props.advert.advert_places[0].city} ${t('advertiser.bank_transaction.last')}`}
                                        </Typography>
                                    </div>
                                )

                        }
                    </CardContent>
                </Card>
            </div>
        );
    }

}

const mapStateToProps = state=>({
    advert: state.authReducer.advertiserReducer.advert,
    loading:state.authReducer.advertiserReducer.loading
})

export default translate('common')
(connect(mapStateToProps,{setAdvertStatus})(withStyles(bankTransactionStyle)(withRouter(BankTransactions))))