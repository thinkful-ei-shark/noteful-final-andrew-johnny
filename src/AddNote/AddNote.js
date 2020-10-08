import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './AddNote.css'
import ApiContext from "../ApiContext";

class AddNote extends Component {
  static contextType = ApiContext;
  state = {
    name: "",
    folderId: "",
    content: "",
    modified: "",
  };

  // two way binders
  handleChangeName = (e) => {
    this.setState({ name: e.currentTarget.value });
  };
  handleChangeContent = (e) => {
    this.setState({ content: e.currentTarget.value });
  };

  handleNoteSubmit = (e) => {
    e.preventDefault();
    let newNote = {
      name: this.state.name,
      modified: new Date(),
      folderId: e.currentTarget.querySelector("select").value,
      content: this.state.content,
    };
    console.log("this is new note", newNote);
    fetch("http://localhost:9090/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json)
      .then((data) => this.context.addNote(data))
      .then(() => {
        this.props.history.goBack();
      });
  };

   validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "name is required";
    }
  }
  validateContent(){
      const content = this.state.content
      if (content.length === 0){
          return "content is required"
      }
  }
  render() {
    const folderOptions = this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      );
    });

    return (
      <div>
        <form
          className="addNote-Form"
          onSubmit={(e) => this.handleNoteSubmit(e)}
        >
          <label htmlFor="name">Note Title: </label>
          <input
            type="text"
            name="folderName"
            id="name"
            onChange={(e) => this.handleChangeName(e)}
            required
          />
          <label htmlFor="selectFolder">Select Folder:</label>
          <select id="selectFolder">{folderOptions}</select>
          <label htmlFor="note-content"> Note Content: </label>
          <textarea
            id="note-content"
            required
            onChange={(e) => this.handleChangeContent(e)}
          />
          <input type="submit" disabled = {this.validateName()||this.validateContent()}/>
        </form>
      </div>
    );
  }
}

export default AddNote;
