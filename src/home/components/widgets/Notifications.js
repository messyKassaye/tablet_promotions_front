import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import AppConsumer from "../../../context/AppConsumer";
class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.handleRequestClose = this.handleRequestClose.bind(this)
    }

    handleRequestClose = () => {
    }

    render() {
        const {show} = this.props
        const {message} = this.props
        return (
            <Snackbar
                open={show}
                message={message}
                onClose={this.handleRequestClose}
                autoHideDuration={4000}
            />
        )
    }
}

export default AppConsumer(Notifications)
