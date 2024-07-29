import styles from './FilterByText.module.css';

const FilterByText = ({placeholder, changedFunction}) => {
    return (
        <input
            type={"text"}
            className={styles.filter + " col-md-5 col-xs-12"}
            placeholder={placeholder}
            onChange={(e) => changedFunction(e.target.value)}
        >
        </input>
    );
};

export default FilterByText;