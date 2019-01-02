import friendlist from "../friendlist";
import * as types from "../../constants/ActionTypes";
import { bindActionCreators } from "redux";

describe("Reducers: FriendListReducers", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
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
  });

  it("should return the initial state", () => {
    let reducer = friendlist(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("should handle ADD_FRIEND", () => {
    let addFriendReducer = friendlist(initialState, {
      type: types.ADD_FRIEND,
      name: "Andrew washington",
      gender: "Male"
    });
    let expectedResult = {
      selectedPage: 1,
      pageSize: 2,
      friendsById: [
        { id: 1, name: "Theodore Roosevelt", gender: "Male", starred: true },
        { id: 2, name: "Abraham Lincoln", gender: "Female", starred: false },
        { id: 3, name: "George Washington", gender: "Male", starred: false },
        { id: 4, name: "Andrew washington", gender: "Male" }
      ]
    };
    expect(addFriendReducer).toEqual(expectedResult);
  });

  it("should handle DELETE_FRIEND", () => {
    let deleteFriendReducer = friendlist(initialState, {
      type: types.DELETE_FRIEND,
      id: 2
    });
    let expectedResult = {
      selectedPage: 1,
      pageSize: 2,
      friendsById: [
        { id: 0, name: "Theodore Roosevelt", gender: "Male", starred: true },
        { id: 1, name: "George Washington", gender: "Male", starred: false }
      ]
    };
    expect(deleteFriendReducer).toEqual(expectedResult);
  });

  it("should handle STAR_FRIEND", () => {
    let starredFriendReducer = friendlist(initialState, {
      type: types.STAR_FRIEND,
      id: 3
    });
    let expectedResult = {
      selectedPage: 1,
      pageSize: 2,
      friendsById: [
        { id: 1, name: "Theodore Roosevelt", gender: "Male", starred: true },
        { id: 2, name: "Abraham Lincoln", gender: "Female", starred: false },
        { id: 3, name: "George Washington", gender: "Male", starred: true }
      ]
    };
    expect(starredFriendReducer).toEqual(expectedResult);
  });

  it("should handle PAGE_CHANGE", () => {
    let pageChangeFriendReducer = friendlist(initialState, {
      type: types.PAGE_CHANGE,
      pageNo: 2
    });
    let expectedResult = {
      selectedPage: 2,
      pageSize: 2,
      friendsById: [
        { id: 1, name: "Theodore Roosevelt", gender: "Male", starred: true },
        { id: 2, name: "Abraham Lincoln", gender: "Female", starred: false },
        { id: 3, name: "George Washington", gender: "Male", starred: false }
      ]
    };
    expect(pageChangeFriendReducer).toEqual(expectedResult);
  });

  it("should handle PAGE_MOVE", () => {
    let pageMoveFriendReducer = friendlist(initialState, {
      type: types.PAGE_MOVE
    });
    let expectedResult = {
      selectedPage: 2,
      pageSize: 2,
      friendsById: [
        { id: 1, name: "Theodore Roosevelt", gender: "Male", starred: true },
        { id: 2, name: "Abraham Lincoln", gender: "Female", starred: false },
        { id: 3, name: "George Washington", gender: "Male", starred: false }
      ]
    };
    expect(pageMoveFriendReducer).toEqual(expectedResult);
  });
});
