import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader"
import withStyles from "@material-ui/core/styles/withStyles";
import newCompanyStyle from "../styles/newCompanyStyle";
import CardContent from "@material-ui/core/CardContent";

class NewCompany extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} =this.props
        return (
            <div>
                <div>
                    <Card>
                        <CardHeader
                            className={classes.header}
                            title={'Register new company'}


                        />
                        <CardContent>
                        </CardContent>
                    </Card>
            </div>
            </div>
        );
    }


}

export default withStyles(newCompanyStyle)(NewCompany)