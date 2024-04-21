// import React, { useEffect, useRef } from 'react';
// import * as atlas from 'azure-maps-control';
// import 'azure-maps-control/dist/atlas.min.css';

// const dealers = [
//     {
//         id: 1,
//         name: "Mumbai",
//         position: [19.0760, 72.8777],
//         address: "Mumbai"
//     },
//     {
//         id: 2,
//         name: "Pune",
//         position: [18.5204, 73.8567],
//         address: "Pune"
//     },
//     {
//         id: 3,
//         name: "Nashik",
//         position: [20.0059, 73.7917],
//         address: "Nashik"
//     }
// ];

// const Maps = ({ subscriptionKey }) => {
//     const mapRef = useRef(null);

//     useEffect(() => {
//         let map;

//         const loadMap = () => {
//             map = new atlas.Map(mapRef.current, {
//                 authOptions: {
//                     authType: atlas.AuthenticationType.subscriptionKey,
//                     subscriptionKey: subscriptionKey
//                 },
//                 center: dealers.length > 0 ? [dealers[0].position[0], dealers[0].position[1]] : [0, 0],
//                 zoom: 10,
//                 view: "Auto"
//             });

//             map.events.add('ready', () => {
//                 dealers.forEach((dealer) => {
//                     const marker = new atlas.HtmlMarker({
//                         color: "DodgerBlue",
//                         text: "D",
//                         position: dealer.position
//                     });

//                     const popup = new atlas.Popup({
//                         pixelOffset: [0, -30]
//                     });

//                     map.events.add('click', marker, () => {
//                         popup.setOptions({
//                             position: dealer.position,
//                             content: `<div style="padding: 10px;">${dealer.name}<br>${dealer.address}</div>`
//                         });
//                         popup.open(map);
//                     });

//                     marker.addTo(map);
//                     popup.addTo(map);
//                 });
//             });
//         };

//         if (!mapRef.current) return;
//         loadMap();

//         return () => {
//             if (map) {
//                 map.dispose();
//             }
//         };
//     }, [subscriptionKey]);

//     return (
//         <div style={{ flex: 1 }}>
//             <div>
//                 {dealers.map((dealer) => (
//                     <div key={dealer.id}>
//                         <h2>{dealer.name}</h2>
//                         <p>{dealer.address}</p>
//                     </div>
//                 ))}
//             </div>

//             <Maps
//                 subscriptionKey={'jtHp2Z3FvRboZARVCUkZv0yqBhTHbrKKgc1uK7JR78g'}
//                 // ref={mapRef}
//                 dealers={dealers}
//                 style={{ width: "100%", height: "400px" }}></Maps>
//         </div>
//     );
// };

// export default Maps;


import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../Header";
import { Footer } from "../Footer";
import * as atlas from 'azure-maps-control';
import './Maps.css'
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
            <div className="map-content">
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