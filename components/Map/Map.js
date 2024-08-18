'use client'
import {YMaps, Map as MapBox, Clusterer, Placemark} from '@pbe/react-yandex-maps';
import {usePointsStore} from "../../store/Store";

const Map = () => {
    const {points, changePoints,activePointer , changeActivePointer} = usePointsStore()

    const MapOptions = {
        modules: ["geocode", "SuggestView"],
        defaultOptions: { suppressMapOpenBlock: true },
        width: "100%",
        height: 550,
    }

    let coordinates = Object.keys(activePointer).length ? JSON.parse(activePointer.coordinates[0]) : [54.98320158443135, 82.8964193250456]
    const initialState = {
        title: "",
        center: coordinates,
        zoom: Object.keys(activePointer).length ? 17 : 13,
    };


    const pointClick = (point) => {
        changeActivePointer(point)
        const pointBlock = document.getElementById(`pointBlock` + point.id)
        if (pointBlock) {            
            pointBlock.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "start" });
        }
    }


    return (
        <>
        <YMaps 
            query={{ apikey: "4fe426f0-a351-4ef2-b397-61b55556993f", lang: "ru_RU"}}
        >
            <MapBox
                {...MapOptions}
                state={initialState}
                defaultState={{ center: [54.98320158443135, 82.8964193250456], zoom: 9 }}
            >
                <Clusterer
                    options={{
                        preset: "islands#invertedVioletClusterIcons",
                        groupByCoordinates: false,
                    }}
                >
                    {
                        points.map((point, index) => (
                            <Placemark
                                key={index}
                                modules={[ 'geoObject.addon.balloon', 'geoObject.addon.hint' ]}
                                geometry={JSON.parse(point.coordinates[0])}
                                onClick={() => pointClick(point)}
                            />
                        ))
                    }
                </Clusterer>
            </MapBox>
        </YMaps>
        </>
    );
};


export default Map;