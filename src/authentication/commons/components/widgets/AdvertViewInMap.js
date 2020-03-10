import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWVzc3lrYXNzYSIsImEiOiJjazdrY3VtbWUwNXM2M21vMzIzeWp3M3Z6In0.dGFUZwa6nmNZEaW2ZjZQDw';
class AdvertViewInMap extends Component {
    mapRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            lng: 40.1401,
            lat: 9.5246 ,
            zoom: 5.29
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        var popup = new mapboxgl.Popup()
            .setHTML('<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>');
        let marker = new mapboxgl.Marker()
            .setLngLat([-21.92661562, 64.14356426])
            .setPopup(popup)
            .addTo(map);
    }

    render() {
        return (
            <div style={{position:"absolute",left:10,top:10,right:10,zIndex:3525252}}>
                <div>{`Lng: ${this.state.lng} lat: ${this.state.zoom}`}</div>
                <div style={{height:600,width:'100%'}} ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        );
    }
}

export default AdvertViewInMap;