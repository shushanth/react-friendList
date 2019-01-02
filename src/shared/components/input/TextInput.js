/**
 * Generic component for input types (number, radio , text..),
 */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./TextInput.css";

const { textInput } = styles;

const TextInput = ({
  name,
  type,
  value = "",
  placeholder,
  focusAuto,
  onInputChange
}) => {
  return (
    <input
      name={name}
      className={classnames("form-control", textInput)}
      value={value}
      type={type}
      autoFocus={focusAuto}
      placeholder={placeholder}
      onChange={onInputChange}
      onKeyDown={onInputChange}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  focusAuto: PropTypes.bool,
  onInputChange: PropTypes.func
};

export default TextInput;
