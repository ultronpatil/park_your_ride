import React, { useEffect, useRef } from 'react'
import Header from '../Header';
import { Footer } from '../Footer';
import * as atlas from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.min.css'

const Destination = [
    {
        id: 1,
        name: "DYPCET",
        position: [-122, 47],
        address: "kop"
    }
]
const Maps = ({ subscriptionKey }) => {

    const mapRef = useRef(null)

    useEffect(() => {
        let map;

        const loadMap = () => {
            map = new atlas.Map(mapRef.current, {
                authOptions: {
                    authType: atlas.AuthenticationType.subscriptionKey,
                    subscriptionKey: subscriptionKey
                },
                center: Destination.length > 0 ? [Destination[0].position[0], Destination[0].position[1]] : [0, 0],
                zoom: 10,
                view: 'Auto'
            })
            map.events.add('ready', () => {
                Destination.forEach((Destination) => {
                    const marker = new atlas.HtmlMarker({
                        color: 'DodgerBlue',
                        text: 'D',
                        position: [Destination.position[0], Destination.position[1]]
                    })

                    const popup = new atlas.Popup({

                        pixelOffset: [0, -30]
                    })
                    map.events.add('click', marker, () => {
                        popup.setOptions({
                            position: [Destination.position[0], Destination.position[1]],
                            content: `<div style="padding:10px;">${Destination.name}<br>${Destination.address}</div>`,
                        })
                        popup.open(map)
                    })
                    map.markers.add(marker)
                    map.popups.add(popup)
                })
            })
        }
        if (!mapRef.current) return
        loadMap()
        return () => {
            if (map) {
                map.dispose()
            }
        }
    }, [subscriptionKey])


    return (
        <>
            <Header />
            <div ref={mapRef} >
                <Maps
                    subscriptionKey={'jtHp2Z3FvRboZARVCUkZv0yqBhTHbrKKgc1uK7JR78g'}
                    Destination={Destination}
                />
            </div>
            <Footer />
        </>
    )
}

export default Maps