import React, { Component } from "react";
import { Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default class GeoJson extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataCoord: []
        };
    }

    componentDidMount() {
        const coords = this.props.coords;
        this.geoJsonData([coords[0]['lat'], coords[0]['lng']], [coords[1]['lat'], coords[1]['lng']]);
    }

    // получаем данные из API
    geoJsonData = (sourse, target) => {
        fetch('https://transportservice.onti.actcognitive.org/api.v2/route', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "source": sourse,
                "target": target,
                "day_time": new Date().getHours() * 3600,
                "mode_type": "car_cost"
            })
        })
            .then(r => r.json())
            .then(data => {
                let dataCoord = [];

                for (let i in data.features) {
                    let pointJson = data.features[i];
                    var coord = pointJson.geometry.coordinates;
                    dataCoord.push([coord[1], coord[0]]);
                }

                this.setState({ dataCoord: dataCoord });
            }, (err) => {
                console.error(err);
            });
    }
    
    render() {
        const dataCoord = this.state.dataCoord;
        return (
            <>
            {(dataCoord !== null) && 
                <Polyline className={'leaflet-polyline'} positions={dataCoord} />
            }
            </>
        );
    }
}