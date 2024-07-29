import {Form} from "react-bootstrap";
import styles from "./FilterBySelection.module.css"
import {usePointsStore} from "../../store/Store";
import React from "react";

const FilterBySelection = ({placeholder, children, changedFunction}) => {
    const {points, changePoints} = usePointsStore()

    return (
        <div className={styles.filter + " col-md-2 col-xs-12"}>
            <Form.Select
                aria-label="Default select example"
                onChange={(item) => changedFunction(item.target.value)}
            >
                <option>
                    {placeholder}
                </option>
                {children}
            </Form.Select>
        </div>
    );
};

export default FilterBySelection;