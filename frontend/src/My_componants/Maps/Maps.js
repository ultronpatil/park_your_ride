import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../Header";
import { Footer } from "../Footer";
import * as atlas from 'azure-maps-control';

const Maps = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(null);
    let atlasScript; // Declare atlasScript outside of useEffect

    useEffect(() => {
        const loadMap = async () => {
            try {
                atlasScript = document.createElement('script');
                atlasScript.src = 'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js';
                atlasScript.async = true;
                atlasScript.defer = true;
                atlasScript.onload = () => setMapLoaded(true);
                atlasScript.onerror = () => setMapError('Error loading Azure Maps SDK');
                document.body.appendChild(atlasScript);
            } catch (error) {
                console.error('Error loading Azure Maps SDK:', error);
                setMapError('Error loading Azure Maps SDK');
            }
        };

        loadMap();

        return () => {
            if (atlasScript) {
                document.body.removeChild(atlasScript);
            }
        };
    }, []);

    useEffect(() => {
        if (mapLoaded) {
            initializeMap();
        }
    }, [mapLoaded]);

    const initializeMap = () => {
        const map = new atlas.Map('map', {
            center: [-122.333, 47.6],
            zoom: 12,
            view: 'Auto',
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: 'jtHp2Z3FvRboZARVCUkZv0yqBhTHbrKKgc1uK7JR78g'
            }
        });
    };

    return (
        <>
            <Header />
            <div className="d-flex flex-wrap">
                <div id="map" style={{ width: "100%", height: "400px" }}>
                    {mapError && <div>{mapError}</div>}
                    {!mapError && !mapLoaded && <div>Loading...</div>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Maps;
