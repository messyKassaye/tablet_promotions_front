import React, {Component} from 'react';
import CompanyCard from "../CompanyCard";

class UsersCompany extends Component {
    render() {
        return (
            <div>
                {
                    this.props.company.map(company=>(
                        <CompanyCard company={company}/>
                    ))
                }
            </div>
        );
    }
}

export default UsersCompany;