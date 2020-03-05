import React, {Component} from 'react';

class AdvertCard extends Component {
    render() {
        return (
            <div>
                {this.props.advert.id}
            </div>
        );
    }
}

export default AdvertCard;