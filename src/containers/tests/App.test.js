import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";

import App from "../App";

describe("Component: <App/>", () => {
  let store, AppcontainerWrapper;
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
  const mockStore = configureStore();
  beforeEach(() => {
    store = mockStore(initialState);
    AppcontainerWrapper = shallow(<App store={store} />);
  });

  it("should render without crashing", () => {
    expect(AppcontainerWrapper.exists()).toBe(true);
    expect(AppcontainerWrapper).toMatchSnapshot();
  });
});
