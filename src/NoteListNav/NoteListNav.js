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
    this.setState({ adding: !this.state.adding });
  };

  render() {
    const { folders = [], notes = [] } = this.context;
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
                {folder.name}
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
          {this.state.adding && <AddFolder />}
        </div>
      </div>
    );
  }
}
