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

    let coordinates = Object.keys(activePointer).length ? JSON.parse(activePointer.coordinates[0]) : [56.47476305742789, 84.96281533862974]
    const initialState = {
        title: "",
        center: coordinates,
        zoom: Object.keys(activePointer).length ? 17 : 13,
    };

    const pointClick = (point) => {
        changeActivePointer(point)
        const pointBlock = document.getElementById(`pointBlock` + point.id)
        if (pointBlock) {
            pointBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    return (
        <YMaps query={{ apikey: "4fe426f0-a351-4ef2-b397-61b55556993f", lang: "ru_RU"}}>
            <MapBox
                {...MapOptions}
                state={initialState}
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
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
                                geometry={JSON.parse(point.coordinates[0])}
                                onClick={() => pointClick(point)}
                            />
                        ))
                    }
                </Clusterer>
            </MapBox>
        </YMaps>
    );
};

export default Map;