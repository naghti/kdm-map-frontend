import {Form} from "react-bootstrap";
import {useState} from "react";

const Input = ({placeholder, changeF, i, typeIndex}) => {
    const [spawnChild, setSpawnChild] = useState(false);

    const formChange = (e) => {
        changeF(typeIndex, i, e.target.value)
        if (e.target.value.trim() != "") {
            setSpawnChild(true)
        } else {
            setSpawnChild(false)
        }
    }


    return (
        <>
            <Form.Control
                type="text"
                placeholder={placeholder}
                onChange={e => formChange(e)}
            />
            {
                spawnChild
                ?
                    <Input
                        placeholder={placeholder}
                        changeF={changeF}
                        typeIndex={typeIndex}
                        i={i+1}
                    />
                :
                    <></>
            }
        </>
    );
};

export default Input;