import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container,Avatar} from "@material-ui/core";
import AdvertsCard from "./widgets/AdvertsCard";
import AdminCard from "./widgets/AdminCard";
import UsersCard from "./widgets/UsersCard";
import AdvertViewAndWithdrawalRequest from "./widgets/AdvertViewAndWithdrawalRequest";


class AdminHome extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Container maxWidth='lg'>
                <AdminCard/>
                <AdvertsCard/>
                <AdvertViewAndWithdrawalRequest/>
                <UsersCard/>
            </Container>
        );
    }
}


export default AdminHome;
