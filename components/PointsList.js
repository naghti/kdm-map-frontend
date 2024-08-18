import { usePointsStore } from "../store/Store"
import Loader from "./Loader/Loader"
import NoData from "./NoDataBar/NoData"
import Point from "./Point/Point"


const PointsList = () => {
    const {filteredPoints, points} = usePointsStore()

    if (points.length == 0) {
        return <Loader/>
    }
    else if (filteredPoints.length == 0) {
        return <NoData/>
    }
    else {
        return (filteredPoints.map((point, index) => (
            <Point
                key={index}
                info={point}
            />
        )))
    }

}

export default PointsList