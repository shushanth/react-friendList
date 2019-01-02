import React from "react";
import { mount, shallow } from "enzyme";

import FriendPagination from "../FriendPagination";

describe("Component: <FriendPagination/>", () => {
  let props;
  let FriendPaginationWrapper;
  let FriendPaginationMountWrapper;
  let getTotalPageBtnCount;
  let getButtonTextValues;
  beforeAll(() => {
    props = {
      pageSize: 2,
      totalPages: 5,
      pageChange: jest.fn(),
      selectedPage: 1
    };
    FriendPaginationWrapper = shallow(<FriendPagination {...props} />);
    FriendPaginationMountWrapper = mount(<FriendPagination {...props} />);
    getTotalPageBtnCount = value => Math.ceil(value / props.pageSize);
    getButtonTextValues = position => {
      return parseInt(
        FriendPaginationMountWrapper.find("Pagination button")
          .at(position)
          .text(),
        10
      );
    };
  });

  it("should render without crashing", () => {
    expect(FriendPaginationWrapper.exists()).toBe(true);
    expect(FriendPaginationWrapper).toMatchSnapshot();
  });

  it("should match the totalPages and pagination buttons count", () => {
    expect(
      FriendPaginationMountWrapper.find("Pagination button").length
    ).toEqual(getTotalPageBtnCount(5));
  });

  it("should have proper button values", () => {
    expect(getButtonTextValues(0)).toEqual(1);
    expect(getButtonTextValues(1)).toEqual(2);
    expect(getButtonTextValues(2)).toEqual(3);
  });

  it("should have pagination buttons count based on the total pages count", () => {
    let friendPagination = mount(
      <FriendPagination {...{ totalPages: 3, pageSize: 2 }} />
    );
    let friendPaginationMore = mount(
      <FriendPagination {...{ totalPages: 10, pageSize: 2 }} />
    );
    expect(friendPagination.find("Pagination button").length).toEqual(
      getTotalPageBtnCount(3)
    );
    expect(friendPaginationMore.find("Pagination button").length).toEqual(
      getTotalPageBtnCount(10)
    );
  });
});
