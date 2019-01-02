import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { Pagination } from "../../shared/components";
import styles from "./FriendPagination.css";

const FriendPagination = ({
  selectedPage,
  pageSize,
  totalPages,
  onPageChange
}) => {
  return (
    <div className={classnames(styles.friendPagination)}>
      <Pagination
        pageSize={pageSize}
        totalPages={totalPages}
        pageChange={onPageChange}
        selectedPage={selectedPage}
      />
    </div>
  );
};

FriendPagination.PropTypes = {
  pageSize: PropTypes.number,
  totalPages: PropTypes.number,
  selectedPage: PropTypes.number,
  pageChange: PropTypes.func
};

export default FriendPagination;
