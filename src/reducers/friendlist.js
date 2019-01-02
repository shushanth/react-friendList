import * as types from "../constants/ActionTypes";

const initialState = {
  selectedPage: 1,
  pageSize: 2,
  friendsById: [
    {
      id: 1,
      name: "Theodore Roosevelt",
      gender: "Male",
      starred: true
    },
    {
      id: 2,
      name: "Abraham Lincoln",
      gender: "Female",
      starred: false
    },
    {
      id: 3,
      name: "George Washington",
      gender: "Male",
      starred: false
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      let friendsList = [...state.friendsById];
      let friendsCount = friendsList.length;
      let friendId = !friendsCount ? 1 : friendsList[friendsCount - 1]["id"];
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            id: friendId + 1,
            name: action.name,
            gender: action.gender
          }
        ]
      };
    case types.DELETE_FRIEND:
      let deletedFriend = state.friendsById.filter(
        item => item.id !== action.id
      );
      let updatedFriends = deletedFriend.map((item, index) => {
        item.id = index;
        return item;
      });
      return {
        ...state,
        friendsById: updatedFriends
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find(item => item.id === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };
    case types.PAGE_CHANGE:
      return {
        ...state,
        selectedPage: action.pageNo
      };
    case types.PAGE_MOVE:
      let friendsListCount = state.friendsById.length;
      let selectedPage = Math.ceil(friendsListCount / state.pageSize);
      return {
        ...state,
        selectedPage
      };
    default:
      return state;
  }
}
