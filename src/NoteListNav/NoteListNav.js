import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// components
import AddFolder from "../AddFolder/AddFolder";
import CircleButton from "../CircleButton/CircleButton";
// context
import ApiContext from "../ApiContext";
// helpers
import { countNotesForFolder } from "../notes-helpers";
import "./NoteListNav.css";

export default class NoteListNav extends React.Component {
  state = {
    adding: false,
  };
  static contextType = ApiContext;

  addFolderHandler = () => {
    console.log("notelist nav state before: ", this.state)
    this.setState({ adding: !this.state.adding })
    this.forceUpdate()
    console.log("notelist nave state: ", this.state);
  };

  render() {
    const { folders = [], notes = [] } = this.context;
    console.log('folders', folders)
    return (
      <div className="NoteListNav">
        <ul className="NoteListNav__list">
          {folders.map((folder) => (
            <li key={folder.id}>
              <NavLink
                className="NoteListNav__folder-link"
                to={`/folder/${folder.id}`}
              >
                <span className="NoteListNav__num-notes">
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.folder_name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="NoteListNav__button-wrapper">
          <CircleButton
            type="button"
            className="NoteListNav__add-folder-button"
            onClick={() => this.addFolderHandler()}
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Folder
          </CircleButton>
          {this.state.adding && <AddFolder handleAdding={this.addFolderHandler}/>}
        </div>
      </div>
    );
  }
}
