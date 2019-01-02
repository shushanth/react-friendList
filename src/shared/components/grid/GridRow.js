import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./GridRow.css";

const GridRow = props => {
  return (
    <div className={classnames(styles.gridRow)}>
      {props.children(props.rowData)}
    </div>
  );
};

GridRow.PropTypes = {
  rowData: PropTypes.object
};

export default GridRow;
