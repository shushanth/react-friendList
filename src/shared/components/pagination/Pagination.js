import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { uuid } from "../../../utils";

import styles from "./Pagination.css";

const Pagination = ({ pageSize, totalPages, selectedPage = 1, pageChange }) => {
  if (pageSize === totalPages) {
    return null;
  }
  const pages = () => {
    return Math.ceil(totalPages / pageSize);
  };
  const getPages = () => {
    let pageNumbers = Array.from({ length: pages() }, (v, i) => i + 1);
    return pageNumbers.map(page => {
      return (
        <div key={uuid()} className={classnames(styles.pageBtn)}>
          <button
            className={classnames({
              [styles.pageSelected]: page === selectedPage
            })}
            onClick={() => pageChange(page)}
          >
            {page}
          </button>
        </div>
      );
    });
  };
  return <div className={classnames(styles.pagination)}>{getPages()}</div>;
};

Pagination.PropTypes = {
  pageSize: PropTypes.number,
  totalPages: PropTypes.number,
  selectedPage: PropTypes.number,
  pageChange: PropTypes.func
};

export default Pagination;
