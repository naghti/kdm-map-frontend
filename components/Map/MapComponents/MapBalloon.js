import styles from "./MapBalloon.module.css"

const MapBalloon = ({position, point}) => {
    const [x, y] = [position.x, position.y]

    console.log(x,y)

    return (
      <div
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        className={styles.balloon}
      >
        {point.name}
      </div>
    )
}

export default MapBalloon