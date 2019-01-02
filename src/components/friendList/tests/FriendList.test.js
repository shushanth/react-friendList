import React from "react";
import { mount, shallow } from "enzyme";

import FriendList from "../FriendList";

describe("Component: <FriendList/>", () => {
  let FriendListWapper;
  let FriendListMountWapper;
  const friends = [
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
  ];
  const actions = {
    starFriend: jest.fn(),
    deleteFriend: jest.fn(),
    pageMove: jest.fn()
  };
  beforeAll(() => {
    FriendListWapper = shallow(
      <FriendList friends={friends} actions={actions} />
    );
    FriendListMountWapper = mount(
      <FriendList
        selectedPage={1}
        pageSize={2}
        friends={friends}
        actions={actions}
      />
    );
  });

  it("should render without crashing", () => {
    expect(FriendListWapper.exists()).toBeTruthy();
    expect(FriendListWapper).toMatchSnapshot();
  });

  it("should have list count same as page size", () => {
    expect(FriendListMountWapper.find("GridRow").length).toEqual(2);
  });

  it("should have list columns same as per the friends", () => {
    let firstFriendList = FriendListMountWapper.find("GridRow").at(0);
    let secondFriendList = FriendListMountWapper.find("GridRow").at(1);
    expect(firstFriendList.find("GridColumn").length).toEqual(2);
    expect(secondFriendList.find("GridColumn").length).toEqual(2);
  });

  it("should match columns values as per the friends list", () => {
    let firstFriend = friends[0];
    let secondFriend = friends[1];
    let firstFriendList = FriendListMountWapper.find("GridRow").at(0);
    let secondFriendList = FriendListMountWapper.find("GridRow").at(1);
    let firstFriendListColumn = firstFriendList.find("GridColumn").at(0);
    let secondFriendListColumn = secondFriendList.find("GridColumn").at(0);
    expect(firstFriendListColumn.find("span").text()).toEqual(firstFriend.name);
    expect(
      firstFriendListColumn
        .find("small")
        .at(0)
        .text()
    ).toEqual(firstFriend.gender);
    expect(secondFriendListColumn.find("span").text()).toEqual(
      secondFriend.name
    );
    expect(
      secondFriendListColumn
        .find("small")
        .at(0)
        .text()
    ).toEqual(secondFriend.gender);
  });

  describe("method: deleteFriend", () => {
    it("should invoke the actions delete method on first list item", () => {
      let deleteFriendListFirstBtn = FriendListMountWapper.find("GridRow")
        .at(0)
        .find("GridColumn")
        .at(1)
        .find("button")
        .at(1);
      deleteFriendListFirstBtn.simulate("click");
      expect(actions.deleteFriend).toHaveBeenCalled();
    });

    it("should invoke the actions delete method on second list item", () => {
      let deleteFriendListSecondBtn = FriendListMountWapper.find("GridRow")
        .at(1)
        .find("GridColumn")
        .at(1)
        .find("button")
        .at(1);
      deleteFriendListSecondBtn.simulate("click");
      expect(actions.deleteFriend).toHaveBeenCalled();
    });
  });

  describe("starredFriend", () => {
    it("should invoke actions starFriend method, click of star friend button in first list", () => {
      let starFriendListFirstBtn = FriendListMountWapper.find("GridRow")
        .at(0)
        .find("GridColumn")
        .at(1)
        .find("button")
        .at(0);
      starFriendListFirstBtn.simulate("click");
      expect(actions.starFriend).toHaveBeenCalled();
    });
    it("should invoke actions starFriend method, click of star friend button in second list", () => {
      let starFriendListSecondBtn = FriendListMountWapper.find("GridRow")
        .at(1)
        .find("GridColumn")
        .at(1)
        .find("button")
        .at(0);
      starFriendListSecondBtn.simulate("click");
      expect(actions.starFriend).toHaveBeenCalled();
    });
  });
});
