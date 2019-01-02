import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { GridRow, GridColumn } from "../../shared/components";
import { uuid } from "../../utils";

import styles from "./FriendList.css";

const FriendList = ({ friends, selectedPage, pageSize, actions }) => {
  let friendsList = [...friends];
  let filteredFriends = [];
  for (let i = 0; i <= selectedPage - 1; i++) {
    filteredFriends = friendsList.splice(0, pageSize);
  }
  const { starFriend, deleteFriend, pageMove } = actions;
  const onDeletFriend = id => {
    deleteFriend(id);
    setTimeout(() => pageMove());
  };
  return (
    <div className={classnames(styles.friendList)}>
      {filteredFriends.map(list => {
        return (
          <div className={classnames(styles.friendListItems)} key={uuid()}>
            <GridRow rowData={list}>
              {rowData => {
                return (
                  <div className={classnames(styles.friendListItem)}>
                    <GridColumn cell={rowData.name}>
                      {cellData => {
                        return (
                          <div className={classnames(styles.friendInfos)}>
                            <div>
                              <span>{rowData.name}</span>
                            </div>
                            <div>
                              <small>{rowData.gender}</small>
                            </div>
                            <div>
                              <small>xx friends in common</small>
                            </div>
                          </div>
                        );
                      }}
                    </GridColumn>
                    <GridColumn>
                      {cellData => {
                        return (
                          <div className={classnames(styles.friendActions)}>
                            <button
                              className={`btn btn-default ${styles.btnAction}`}
                              onClick={() => starFriend(list.id)}
                            >
                              <i
                                className={classnames("fa", {
                                  "fa-star": rowData.starred,
                                  "fa-star-o": !rowData.starred
                                })}
                              />
                            </button>
                            <button
                              className={`btn btn-default ${styles.btnAction}`}
                              onClick={() => onDeletFriend(list.id)}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        );
                      }}
                    </GridColumn>
                  </div>
                );
              }}
            </GridRow>
          </div>
        );
      })}
    </div>
  );
};

FriendList.PropTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  starFriend: PropTypes.func,
  deleteFriend: PropTypes.func
};

export default FriendList;
