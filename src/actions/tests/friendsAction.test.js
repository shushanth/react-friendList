import * as types from "../../constants/ActionTypes";
import * as actions from "../friendsActions";

describe("actions: FriendsListAction", () => {
  it("should create action to add a friend", () => {
    const friend = { name: "Andy william", gender: "Male" };
    const expectedAction = {
      type: types.ADD_FRIEND,
      name: friend.name,
      gender: friend.gender
    };
    expect(actions.addFriend(friend.name, friend.gender)).toEqual(
      expectedAction
    );
  });

  it("should create action to delete a friend", () => {
    const friendId = 1;
    const expectedAction = {
      type: types.DELETE_FRIEND,
      id: friendId
    };
    expect(actions.deleteFriend(friendId)).toEqual(expectedAction);
  });

  it("should create action to star a friend", () => {
    const friendId = 2;
    const expectedAction = {
      type: types.STAR_FRIEND,
      id: friendId
    };
    expect(actions.starFriend(friendId)).toEqual(expectedAction);
  });

  it("should create action to change a page", () => {
    const pageNumber = 3;
    const expectedAction = {
      type: types.PAGE_CHANGE,
      pageNo: pageNumber
    };
    expect(actions.pageChange(pageNumber)).toEqual(expectedAction);
  });

  it("should create action to change a page", () => {
    const expectedAction = {
      type: types.PAGE_MOVE
    };
    expect(actions.pageMove()).toEqual(expectedAction);
  });
});
