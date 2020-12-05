import React, { Component } from "react";

import ApiContext from "../ApiContext";
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
  static contextType = ApiContext;

  state = {
    id: "",
    name: "",
    error: null
  };

  handleChange = (e) => {
    this.setState({ name: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newName = this.state.name;
    let newFolder = {
      title: newName,
    };
    console.log(newFolder)
    fetch(`${config.API_ENDPOINT}/folders`, {
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
      .catch(err => this.setState({error: err.message}));
  };

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "name is required";
    }
  }

  render() {
    let renderError = null;
    if(this.state.error) {
      renderError = <p className='error-message'>{this.state.error}</p>
    }

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
          {renderError}
        </form>
      </div>
    );
  }
}
