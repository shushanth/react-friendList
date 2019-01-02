import React from "react";
import { mount, shallow } from "enzyme";

import RadioGroup from "../RadioGroup";
import RadioOption from "../RadioOption";

describe("Component: <RadioGroup/>", () => {
  let RadioGroupWrapper;
  let RadioGroupMountWrapper;
  let props;
  beforeAll(() => {
    props = {
      name: "gender",
      radioValue: "Female",
      onRadioChange: jest.fn()
    };
    RadioGroupWrapper = shallow(
      <RadioGroup {...props}>
        <RadioOption value="Male" />
        <RadioOption value="Female" />
      </RadioGroup>
    );
    RadioGroupMountWrapper = mount(
      <RadioGroup {...props}>
        <RadioOption value="Male" />
        <RadioOption value="Female" />
      </RadioGroup>
    );
  });

  it("should render without crashing", () => {
    expect(RadioGroupWrapper.exists()).toBe(true);
    expect(RadioGroupWrapper).toMatchSnapshot();
    expect(RadioGroupWrapper.find("RadioOption").length).toEqual(2);
  });

  it("should not render radio option, when RadioOption is not present", () => {
    let radioGroupWithOption = shallow(<RadioGroup {...props} />);
    expect(radioGroupWithOption.find("div").children().length).toBe(0);
  });

  it("should have the radioOption based on childrens of the same", () => {
    let radioGroupOneOption = shallow(
      <RadioGroup {...props}>
        <RadioOption value="Male" />
      </RadioGroup>
    );
    expect(radioGroupOneOption.find("RadioOption").length).toEqual(1);
  });

  it("should have radioOption value same as prop value", () => {
    expect(
      RadioGroupWrapper.find("RadioOption")
        .at(0)
        .props().value
    ).toEqual("Male");
    expect(
      RadioGroupWrapper.find("RadioOption")
        .at(1)
        .props().value
    ).toEqual(props.radioValue);
  });

  it("should have radioOption isChecked boolean value, same as prop radioValue", () => {
    let radioGroupMount = shallow(
      <RadioGroup {...{ radioValue: "Male" }}>
        <RadioOption value="Male" />
        <RadioOption value="Female" />
      </RadioGroup>
    );
    expect(
      RadioGroupWrapper.find("RadioOption")
        .at(0)
        .props().isChecked
    ).toBeFalsy();
    expect(
      RadioGroupWrapper.find("RadioOption")
        .at(1)
        .props().isChecked
    ).toBeTruthy();
    expect(
      radioGroupMount
        .find("RadioOption")
        .at(0)
        .props().isChecked
    ).toBeTruthy();
    expect(
      radioGroupMount
        .find("RadioOption")
        .at(1)
        .props().isChecked
    ).toBeFalsy();
  });
  describe("method: onRadioChange", () => {
    it("should invoke props onRadioChange method on change in radioOption", () => {
      let inputRadioOption = RadioGroupMountWrapper.find("RadioOption")
        .at(0)
        .find("input");
      inputRadioOption.simulate("change");
      expect(props.onRadioChange).toHaveBeenCalled();
    });
  });
});
