import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import myCompanyStyle from "../styles/myCompaniesStyle";
import {withRouter} from 'react-router-dom'
class MyCompanies extends React.Component{

    constructor(props) {
        super(props);
        this.newCompany = this.newCompany.bind(this)

    }

    newCompany = ()=>{

    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={'Companies'}
                        action={
                            <div>
                                <Button
                                    component={Link}
                                    to='/companyRegistration'
                                    color='inherit'
                                    variant='outlined'
                                    className={classes.new_advert_button} >
                                    {'Register new company'}
                                </Button>
                                <IconButton
                                    component={Link}
                                    to='/new_adverts'
                                    color='inherit'
                                    variant='outlined'
                                    className={classes.addIcon} >
                                    <AddIcon/>
                                </IconButton>
                            </div>
                        }

                    />
                    <CardContent>
                    </CardContent>
                </Card>
            </div>
        );
    }


}

export default withRouter(withStyles(myCompanyStyle)(MyCompanies))