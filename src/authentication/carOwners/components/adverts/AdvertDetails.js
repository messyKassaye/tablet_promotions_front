import React from "react";

class AdvertDetails extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {
                    this.props.cars.map(cars=>cars.map(item=>(
                        <ul key={item.id}>
                            <li>{item.plate_number}</li>
                        </ul>
                    )))
                }
            </div>
        );
    }

}

export default AdvertDetails