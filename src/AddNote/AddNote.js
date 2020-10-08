import React, { Component } from "react";
import cuid from "cuid";
import ApiContext from "../ApiContext";

class AddNote extends Component {
  static contextType = ApiContext;
state={
    id:cuid(),
    name:"",
    folderId: "",
    content: "",
    modified:''
}
handleChangeName=(e)=>{
this.setState({name:e.currentTarget.value})
}
handleChangeConten=(e)=>{
    this.setState({content:e.currentTarget.value})
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
          onSubmit={(e) => this.handleSubmit(e)}
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
          <textarea id="note-content" required onChange={(e) => this.handleChangeContent(e)}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddNote;
