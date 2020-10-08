import React, { Component } from "react";
import cuid from "cuid";

export default class AddFolder extends Component {
  state = {
    id: "",
    name: "",
  };

  handleChange = (e) => {
    this.setState({ name: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ id: cuid });
    let newName = this.state.name;
    console.log(this.state.name);
    let newFolder = {
      name: newName,
    };
    console.log(newFolder);
    fetch("http://localhost:9090/folders", {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFolder),
    }).then((response) => response.json());
  };

  render() {
    return (
      <div>
        <form className="addFolder-Form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="folderName"
            id="folderName"
            onChange={(e) => this.handleChange(e)}
            required
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
