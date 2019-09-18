import React from "react";
import {connect} from "react-redux";
import {fetchRole} from "../../state/action/roleActions";
import PropTypes from 'prop-types'

class SignUpForm extends React.Component{

    componentWillMount() {
        this.props.fetchRole()
    }

    render() {
        const  roles = this.props.roles.map(items=>(
            <ul key={items.name}>
                <li>{items.name}</li>
            </ul>
        ))
        return (
            <div>
                {
                    roles
                }
            </div>
        )

    }
}

PropTypes.fetchRole ={
    fetchRole: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
}

const mapStateToProps = state=>(
    {
        roles: state.role.roles
    }
)

export default connect(mapStateToProps,{fetchRole})(SignUpForm)