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
    error: null
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
    fetch("http://localhost:9090/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => {
        if(!response.ok) {
          throw Error(response.statusText)
        }
       return response.json()
      })
      .then((data) => {
        this.context.addNote(data);
        this.props.history.push(`/note/${data.id}`);
      })
      .catch(err => this.setState({error: err.message}));
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

    let errorRender = null; 
    if(this.state.error) {
      errorRender = <p className='error-message'>{this.state.error}</p>
    }

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
          {errorRender}
        </form>
      </div>
    );
  }
}

export default AddNote;
