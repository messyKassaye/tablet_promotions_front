import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container,Avatar} from "@material-ui/core";

import {fetchAdverts} from "../state/action/advertsAction";
import {fetchUsers} from "../state/action/adminUsersAction";
import {connect} from "react-redux";
import AdvertsCard from "./widgets/AdvertsCard";
import AdminCard from "./widgets/AdminCard";
import UsersCard from "./widgets/UsersCard";


class AdminHome extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Container maxWidth='lg'>
                <AdminCard/>
                <AdvertsCard/>
                <UsersCard/>
            </Container>
        );
    }
}


export default AdminHome;
