import React from "react";
import {Typography} from "@material-ui/core";

class FinanceCredit extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Typography variant='h5' gutterBottom>Your credits</Typography>
            </div>
        );
    }

}

export default FinanceCredit