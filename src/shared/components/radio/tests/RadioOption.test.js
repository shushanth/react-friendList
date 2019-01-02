import React from "react";
import { shallow } from "enzyme";

import RadioOption from "../RadioOption";

describe("Component: <RadioOption/>", () => {
  let props;
  let RadioOptionWrapper;
  beforeAll(() => {
    props = {
      name: "test",
      isChecked: false,
      value: "Test",
      onChange: jest.fn()
    };
    RadioOptionWrapper = shallow(<RadioOption {...props} />);
  });

  it("should render without crashing", () => {
    expect(RadioOptionWrapper.exists()).toBe(true);
    expect(RadioOptionWrapper).toMatchSnapshot();
  });

  it("should have input with attributes , matches the supplied props values", () => {
    expect(RadioOptionWrapper.find("input").props().value).toEqual(props.value);
    expect(RadioOptionWrapper.find("input").props().checked).toEqual(props.isChecked);
    expect(RadioOptionWrapper.find("input").props().name).toEqual(props.name);
  });

  it("should have label value same as prop value", () => {
    expect(RadioOptionWrapper.find("label").props().htmlFor).toEqual(props.value);
    expect(RadioOptionWrapper.find("label").text()).toEqual(props.value);
  });
  
  describe("method: onChange", () => {
    it("should invoke onChange supplied prop method, on change in input", () => {
      let inputRadioOption = RadioOptionWrapper.find("input");
      inputRadioOption.simulate('change');
      expect(props.onChange).toHaveBeenCalled();
    })
  })

});
