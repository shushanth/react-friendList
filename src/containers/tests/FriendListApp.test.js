import React from "react";
import { shallow } from "enzyme";

import FriendListApp from "../FriendListApp";

//as the component is pure component
const FriendListAppComponent = FriendListApp.WrappedComponent;

describe("Component: <FriendListApp/>", () => {
  let FriendListAppWrapper, props;

  beforeAll(() => {
    props = {
      friendlist: {
        ...{
          selectedPage: 1,
          pageSize: 2,
          friendsById: [
            {
              id: 1,
              name: "Theodore Roosevelt",
              gender: "Male",
              starred: true
            }
          ]
        }
      },
      addFriend: jest.fn(),
      deleteFriend: jest.fn(),
      starFriend: jest.fn(),
      pageChange: jest.fn(),
      pageMove: jest.fn()
    };
    FriendListAppWrapper = shallow(<FriendListAppComponent {...props} />);
  });

  it("should render without crashing", () => {
    expect(FriendListAppWrapper.exists()).toBe(true);
    expect(FriendListAppWrapper).toMatchSnapshot();
  });

  it("should have heading title in h1", () => {
    let heading = FriendListAppWrapper.find("h1").text();
    expect(heading).toEqual("The FriendList");
  });

  it("should have add friend component", () => {
    let addFriendComponent = FriendListAppWrapper.find("AddFriendForm");
    expect(addFriendComponent.exists()).toBe(true);
    expect(addFriendComponent).toMatchSnapshot();
  });

  it("should have friend list component", () => {
    let friendListComponent = FriendListAppWrapper.find("FriendList");
    expect(friendListComponent.exists()).toBe(true);
    expect(friendListComponent).toMatchSnapshot();
  });

  it("should have not friend pagination component, when friends are less than two", () => {
    let friendPaginationComponent = FriendListAppWrapper.find(
      "FriendPagination"
    );
    expect(friendPaginationComponent).toMatchSnapshot();
  });
});
