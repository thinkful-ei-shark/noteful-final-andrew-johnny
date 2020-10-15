import React, { Component } from "react";
import cuid from "cuid";
import ApiContext from "../ApiContext";

export default class AddFolder extends Component {
  static contextType = ApiContext;

  state = {
    id: "",
    name: ""
  };

  handleChange = (e) => {
    this.setState({ name: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newName = this.state.name;
    let newFolder = {
      name: newName,
    };
    fetch("http://localhost:9090/folders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFolder),
    })
      .then((response) => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
       return response.json()
      })
      .then((data) => {
        this.context.addFolder(data);
      })
      .catch(err => console.log(err.message));
  };

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "name is required";
    }
  }

  render() {
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
