import React from 'react'
import './Note.css'


const Note = ({ note, deleteNotes, completeNote }) => {

  return (
    <div className={
      "list" + (note.complete ? " is-complete" : "")} key={note.id} onClick={() => completeNote(note.id)}>
        <li className="note" key={note.id}>
          <div className="checkbox"></div>
          {note.content}
          <button className="delete-button" onClick={() => deleteNotes(note.id)}><i class="fas fa-times"></i></button>
        </li>
  </div>
  )
}

export default Note

//  <div className={
//   "list" + (list.complete ? " is-complete" : "")
// } key={list._id} onClick={() => completeList(list._id)}>
//   <div className="checkbox"></div>

//   <div className="text">{list.text}</div>

//   <div className="delete-list" onClick={() => deleteList(list._id)}>x</div>
// </div>
