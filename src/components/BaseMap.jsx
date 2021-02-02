import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, ZoomControl, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import GeoJson from './GeoJson.jsx';

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

export default class BaseMap extends Component {
    constructor() {
        super();

        this.state = {
            mapOptions: {
                // по-умолчанию показываем СПБ
                position: [59.939095, 30.315868],
                zoom: 10
            },
            markers: [],
        };
    }

    /*
    Добавляем маркер на карту
    Максимум можно два маркера
    По третьему клику по карте все маркеры и маршрут пропадают
    */
    AddMarker = ({ latlng }) => {
        this.setState(({ markers }) => ({
            markers: markers.length >= 2 
                ? [] 
                : [ ...markers, latlng ]
        }));
    }

    render() {
        const markers = this.state.markers;
        return (
            <div className="container">
                <Map 
                    zoom={this.state.mapOptions.zoom}
                    zoomControl={false}
                    center={this.state.mapOptions.position}
                    onClick={this.AddMarker}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position="topright" />

                    {markers.map(p => 
                        <Marker key={p} position={p} />
                    )}
                    {(markers.length === 2) && 
                        <GeoJson coords={markers} />
                    }
                </Map>
            </div>
        );
    }
};