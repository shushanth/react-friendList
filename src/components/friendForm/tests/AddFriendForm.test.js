import React from "react";
import { mount, shallow } from "enzyme";

import AddFriendForm from "../AddFriendForm";
import { TextInput, RadioGroup, RadioOption } from "../../../shared/components";
import { KEYBOARD_EVENTS } from "../../../utils";

describe("Component: <AddFriendForm/>", () => {
  const AddFriendFormWapper = shallow(<AddFriendForm />);
  const AddFriendFormMountWrapper = mount(<AddFriendForm />);
  beforeEach(() => {
    const initialState = { name: "", gender: "Male" };
    AddFriendFormMountWrapper.setState(initialState);
  });

  it("should render without crashing", () => {
    expect(AddFriendFormWapper.exists()).toBe(true);
    expect(AddFriendFormWapper).toMatchSnapshot();
  });

  it("should have text input component to add friends", () => {
    expect(AddFriendFormWapper.find("TextInput").length).toBe(1);
  });

  it("should have checkbox components to add gender", () => {
    expect(AddFriendFormWapper.find("RadioGroup").length).toBe(1);
    expect(AddFriendFormWapper.find("RadioOption").length).toBe(2);
  });

  it("should have add friend input with proper props values intially", () => {
    let addFriendInputProps = AddFriendFormWapper.find("TextInput").props();
    expect(addFriendInputProps.value).toEqual("");
    expect(addFriendInputProps.placeholder).toEqual(
      "Type the name of a friend"
    );
    expect(addFriendInputProps.focusAuto).toBeTruthy();
    expect(addFriendInputProps.updateOnkeyDown).toBeTruthy();
  });

  it("should have proper value set for add friend input component, on change of state ", () => {
    AddFriendFormMountWrapper.setState({ name: "Leonardo" });
    expect(AddFriendFormMountWrapper.find("TextInput").props().value).toEqual(
      "Leonardo"
    );
  });

  it("should have checkbox values respective of genders", () => {
    let genderMaleProps = AddFriendFormWapper.find("RadioOption")
      .at(0)
      .props();
    let genderFemaleProps = AddFriendFormWapper.find("RadioOption")
      .at(1)
      .props();
    expect(genderMaleProps.value).toEqual("Male");
    expect(genderFemaleProps.value).toEqual("Female");
  });

  it("should have checkbox selected , with proper state set", () => {
    expect(
      AddFriendFormMountWrapper.find("RadioGroup").props().radioValue
    ).toEqual("Male");
    expect(
      AddFriendFormMountWrapper.find("RadioGroup RadioOption")
        .at(0)
        .props().isChecked
    ).toBeTruthy();
    expect(
      AddFriendFormMountWrapper.find("RadioGroup RadioOption")
        .at(1)
        .props().isChecked
    ).toBeFalsy();
    AddFriendFormMountWrapper.setState({ gender: "Female" });
    expect(
      AddFriendFormMountWrapper.find("RadioGroup").props().radioValue
    ).toEqual("Female");
    expect(
      AddFriendFormMountWrapper.find("RadioGroup RadioOption")
        .at(0)
        .props().isChecked
    ).toBeFalsy();
    expect(
      AddFriendFormMountWrapper.find("RadioGroup RadioOption")
        .at(1)
        .props().isChecked
    ).toBeTruthy();
  });

  describe("method: handleChangeName", () => {
    it("should have proper states updated on invoking this method", () => {
      const AddFriendFormWrapperInstance = AddFriendFormWapper.instance();
      const customEvent = {
        target: { value: "John william" }
      };
      expect(AddFriendFormWapper.state("name")).toEqual("");
      AddFriendFormWrapperInstance.handleNameChange(customEvent);
      expect(AddFriendFormWapper.state("name")).toEqual("John william");
    });
    it("should invoke this method on change of AddFriend input componet", () => {
      const handleChangeNameMock = jest.fn();
      const customEvent = {
        target: { value: "Adam paul" }
      };
      const TextInputComponent = mount(
        <TextInput
          type="text"
          name="addFriend"
          onInputChange={handleChangeNameMock}
        />
      );
      TextInputComponent.find("input[name='addFriend']").simulate(
        "change",
        customEvent
      );
      expect(handleChangeNameMock).toHaveBeenCalled();
    });

    it("should invoke props method addFriend, on enter of text input", () => {
      const addFriendMock = jest.fn();
      const pageMoveMock = jest.fn();
      const customEvent = {
        target: { value: "Adam paul" },
        which: KEYBOARD_EVENTS.ENTER_KEY
      };
      let AddFriendFormComponent = shallow(
        <AddFriendForm addFriend={addFriendMock} pageMove={pageMoveMock} />
      );
      AddFriendFormComponent.instance().handleNameChange(customEvent);
      expect(addFriendMock).toHaveBeenCalledWith("Adam paul", "Male");
    });
  });
  describe("method: handleGenderChange", () => {
    it("should invoke this method and change state should be changed accordingly", () => {
      const handleGenderChangeMock = jest.fn();
      const customEvent = { target: { value: "Female" } };
      const RadioGroupComponent = mount(
        <RadioGroup
          name="gender"
          radioValue="Female"
          onRadioChange={handleGenderChangeMock}
        >
          <RadioOption value="Male" />
          <RadioOption value="Female" />
        </RadioGroup>
      );
      RadioGroupComponent.find("input[type='radio'][value='Male']").simulate(
        "change",
        customEvent
      );
      expect(handleGenderChangeMock).toHaveBeenCalled();
      expect(AddFriendFormWapper.state("gender")).toEqual("Male");
    });
  });
});
