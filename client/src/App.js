import  Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  // const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }



  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const deleteNotes = (id) => {
    Axios.delete(`/api/notes/${id}`).then(() => {
      setNotes(notes => notes.filter(note => note.id !== id))
    })
  }
  
  const completeNote = (id) =>{
    const data =  Axios.put(`/api/notes/${id}`).then(
      setNotes(notes => notes.map(note => {
        if (note.id === data.id){
          note.complete = data.complete
        }
        return note;
      }))
    )
  }

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <Notification message={errorMessage} /> 
      <ul>
        {notes.length > 0 ? notes.map(note => (
            <Note
              key={note.id}
              note={note} 
              deleteNotes={deleteNotes}
              completeNote={completeNote}
            />
        )) : (
          <p>You currently have no tasks, click the plus button to add items.</p>
        )}
      </ul>
      <div>
            <div className="addPopup" onClick={() => setPopupActive(true)}><i class="fas fa-plus"></i></div>
    
            {popupActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive(false)}><i class="fas fa-times"></i></div>
                    <div className="content">
                        <h3>Add Item</h3>
                        <form onSubmit={addNote}>
                            <input 
                                type="text" 
                                className="add-list-input" 
                                value={newNote}
                                onChange={handleNoteChange}
                            />
                            <br/>
                            <button type="submit">add</button>
                        </form>
                        
                    </div>
                </div>
            ) : ''}
        </div>

      <Footer />  
    </div>
  )
}

export default App



