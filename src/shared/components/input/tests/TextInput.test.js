import React from "react";
import { shallow } from "enzyme";

import TextInput from "../TextInput";
import styles from "../TextInput.css";

describe("Component: <TextInput/>", () => {
  let textInputWrapper;
  let props;
  beforeAll(() => {
    props = {
      name: "Test",
      type: "text",
      value: "",
      placeholder: "test placeholder",
      focusAuto: true,
      onInputChange: jest.fn()
    };
    textInputWrapper = shallow(<TextInput {...props} />);
  });

  it("should render without crashing", () => {
    expect(textInputWrapper.exists()).toBe(true);
    expect(textInputWrapper).toMatchSnapshot();
  });

  it("should have render input with attributes, matches props value", () => {
    let inputElement = textInputWrapper.find("input");
    expect(inputElement.props().name).toEqual(props.name);
    expect(inputElement.props().value).toEqual(props.value);
    expect(inputElement.props().autoFocus).toEqual(props.focusAuto);
    expect(inputElement.props().placeholder).toEqual(props.placeholder);
    expect(inputElement.props().type).toEqual(props.type);
  });

  describe("method: onInputChange", () => {
    it("should invoke onInputChange prop method, on input change", () => {
      let inputElement = textInputWrapper.find("input");
      inputElement.simulate("change");
      expect(props.onInputChange).toHaveBeenCalled();
    });

    it("should invoke onInputChange prop method, on input keydown", () => {
      let inputElement = textInputWrapper.find("input");
      inputElement.simulate("keyDown");
      expect(props.onInputChange).toHaveBeenCalled();
    });
  });
});
