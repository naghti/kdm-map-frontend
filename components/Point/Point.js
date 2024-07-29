
import PointActive from "./PointActive";
import CommonPoint from "./CommonPoint";
import {usePointsStore} from "../../store/Store";
import {CSSTransition, TransitionGroup} from "react-transition-group"

const Point = ({info}) => {
    const {activePointer, changeActivePointer} = usePointsStore()

    return (
        <div
            className={"col-md-6 col-12"}
            onClick={() => changeActivePointer(info)}
            id={"pointBlock" + info.id}
        >
            <TransitionGroup>
                {
                info._id != activePointer._id ? (
                    <CommonPoint info={info}/>
                ) : (
                    <CSSTransition
                        timeout={500}
                        classNames={"point"}
                    >
                        <PointActive
                            info={info}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )

};

export default Point;