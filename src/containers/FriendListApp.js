import React from "react";
import styles from "./FriendListApp.css";
import { connect } from "react-redux";

import {
  addFriend,
  deleteFriend,
  starFriend,
  pageChange,
  pageMove
} from "../actions/friendsActions";
import { FriendList, AddFriendForm, FriendPagination } from "../components";

const FriendListApp = props => {
  const {
    friendlist: { friendsById, selectedPage, pageSize },
    addFriend,
    deleteFriend,
    starFriend,
    pageChange,
    pageMove
  } = props;

  const actions = {
    addFriend,
    deleteFriend,
    starFriend,
    pageChange,
    pageMove
  };

  let totalPages = friendsById.length || 0;
  return (
    <div className={styles.friendListApp}>
      <h1>The FriendList</h1>
      <AddFriendForm
        pageMove={actions.pageMove}
        addFriend={actions.addFriend}
      />
      <FriendList
        friends={friendsById}
        actions={actions}
        selectedPage={selectedPage}
        pageSize={pageSize}
      />
      {!(totalPages <= pageSize) ? (
        <FriendPagination
          selectedPage={selectedPage}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={actions.pageChange}
        />
      ) : null}
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  {
    addFriend,
    deleteFriend,
    starFriend,
    pageChange,
    pageMove
  }
)(FriendListApp);
