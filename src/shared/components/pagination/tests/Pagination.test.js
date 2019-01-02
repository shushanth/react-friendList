import React from "react";
import { shallow } from "enzyme";

import Pagination from "../Pagination";

describe("Component: <Pagination/>", () => {
  let PaginationWrapper;
  let props;
  let getPageButtons;
  beforeAll(() => {
    props = {
      pageSize: 2,
      totalPages: 3,
      selectedPage: 1,
      pageChange: jest.fn()
    };
    PaginationWrapper = shallow(<Pagination {...props} />);
    getPageButtons = value => parseInt(Math.ceil(value / props.pageSize));
  });

  it("should render without crashing", () => {
    expect(PaginationWrapper.exists()).toBe(true);
  });

  it("should have number of page buttons as per the props total pages", () => {
    expect(PaginationWrapper.find("button").length).toEqual(
      getPageButtons(props.totalPages)
    );
  });

  describe("method: pageChange", () => {
    it("should invoke props pageChange on click of page button", () => {
      let pageFirstButton = PaginationWrapper.find("button").at(0);
      pageFirstButton.simulate("click");
      expect(props.pageChange).toHaveBeenCalled();
      expect(props.pageChange).toHaveBeenCalledWith(1);
    });
  });
});
