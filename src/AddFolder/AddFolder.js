import React, { Component } from "react";
import cuid from "cuid";
import ApiContext from "../ApiContext";

export default class AddFolder extends Component {
  static contextType = ApiContext;

  state = {
    id: "",
    name: "",
  };

  handleChange = (e) => {
    this.setState({ name: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newName = this.state.name;
    console.log(this.state.name);
    let newFolder = {
      name: newName,
    };
    console.log(newFolder);
    fetch("http://localhost:9090/folders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFolder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.context.addFolder(data);
      });
  };

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "name is required";
    }
  }

  render() {
    console.log("this is context", this.context);
    return (
      <div>
        <form
          className="addFolder-Form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <label htmlFor="folderName">Name: </label>
          <input
            type="text"
            name="folderName"
            id="folderName"
            onChange={(e) => this.handleChange(e)}
            required
          />
          <input type="submit" disabled={this.validateName()} />
        </form>
      </div>
    );
  }
}
