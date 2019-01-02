import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import { TextInput, RadioGroup, RadioOption } from "../../shared/components";
import { KEYBOARD_EVENTS } from "../../utils";
import styles from "./AddFriendForm.css";

const { ENTER_KEY } = KEYBOARD_EVENTS;

class AddFriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "Male"
    };
  }

  handleNameChange = event => {
    const { addFriend, pageMove } = this.props;
    let name = event.target.value;
    let gender = this.state.gender;
    this.setState({ name });
    if (name && event.which === ENTER_KEY) {
      addFriend(name, gender);
      this.setState({ name: "", gender: "Male" });
      setTimeout(() => pageMove());
    }
  };

  handleGenderChange = event => {
    let {
      target: { value }
    } = event;
    this.setState(...this.state, { gender: value });
  };

  render() {
    return (
      <div className={classnames(styles.addForm)}>
        <TextInput
          name="addFriend"
          type="text"
          placeholder="Type the name of a friend"
          value={this.state.name}
          focusAuto={true}
          updateOnkeyDown={true}
          onInputChange={this.handleNameChange}
        />
        <div className={classnames(styles.addFormGender)}>
          <RadioGroup
            name="gender"
            radioValue={this.state.gender}
            onRadioChange={this.handleGenderChange}
          >
            <RadioOption value="Male" />
            <RadioOption value="Female" />
          </RadioGroup>
        </div>
      </div>
    );
  }
}

AddFriendForm.PropTypes = {
  addFriend: PropTypes.func
};

export default AddFriendForm;
