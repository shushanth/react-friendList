import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./GridColumn.css";

const GridColumn = props => {
  return (
    <div className={classnames(styles.gridColumn)}>
      {props.children(props.cell)}
    </div>
  );
};

GridColumn.PropTypes = {
  cell: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.func
};

export default GridColumn;
