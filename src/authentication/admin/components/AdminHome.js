import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import AdvertsCard from "./widgets/AdvertsCard";
import AdminCard from "./widgets/AdminCard";
import UsersCard from "./widgets/UsersCard";
import AdvertViewAndWithdrawalRequest from "./widgets/AdvertViewAndWithdrawalRequest";
import AdvertsInTable from "./widgets/AdvertsInTable";
import FinanceCards from "./widgets/FinanceCards";
import CompaniesCard from "./widgets/CompaniesCard";


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
                <CompaniesCard/>
                <FinanceCards/>
                <AdvertsInTable/>
            </Container>
        );
    }
}


export default AdminHome;
