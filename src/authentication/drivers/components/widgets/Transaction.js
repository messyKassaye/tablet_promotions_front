import React from "react";
import {Typography} from "@material-ui/core";

class Transaction extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Typography variant='h5' gutterBottom>Transaction History</Typography>
            </div>
        );
    }


}

export default Transaction