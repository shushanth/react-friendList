/**
 * Generic component for radio option, used in composed component (Radio group)
 */

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./RadioOption.css";

const RadioOption = ({ name, isChecked, value, onChange }) => {
  return (
    <div className={classnames(styles.radioOption)}>
      <input
        className={classnames(styles.radioOption)}
        type="radio"
        value={value}
        id={value}
        name={name}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
};

RadioOption.PropTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default RadioOption;
