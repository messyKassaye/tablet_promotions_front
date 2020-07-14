import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import CompaniesCard  from './widgets/CompaniesCard'

class Companies extends Component {

    render() {
        return (
            <Container maxWidth={"lg"}>
                <CompaniesCard/>
            </Container>
        );
    }
}

export default Companies;