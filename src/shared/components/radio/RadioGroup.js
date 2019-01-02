/**
 * Generic radio group component
 */

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./RadioGroup.css";

const RadioGroup = props => {
  const radioGroups = React.Children.map(props.children, child => {
    if (child.type.name === "RadioOption") {
      return React.cloneElement(child, {
        isChecked: props.radioValue === child.props.value,
        onChange: props.onRadioChange,
        name
      });
    }
  });
  return <div className={classnames(styles.radioGroup)}>{radioGroups}</div>;
};

RadioGroup.PropTypes = {
  name: PropTypes.string,
  radioValue: PropTypes.string,
  onRadioChange: PropTypes.func
};

export default RadioGroup;
