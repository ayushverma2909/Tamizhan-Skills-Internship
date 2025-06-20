import { useEffect, useState } from 'react'
import Header from './components/Header'
import Input from './components/input'
import Card from './components/card'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('myNotes');
    return saved ? JSON.parse(saved) : [];
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all"); 

    useEffect(() => {
    localStorage.setItem('myNotes', JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote){
    setNotes(prevValue => {
      return [...prevValue, { ...newNote, 
      id: uuidv4(),
      isPending: true, 
      edited: false, 
      isPinned: false,
      time: new Date()  
    }]
    })
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
  }


  function editNote(id, currentContent) {
    setEditTaskId(id);
    setEditText({ content: currentContent });
  }

  function saveEditNote(id, updatedNote) {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, ...updatedNote, edited: true, time: new Date() } : note
    );
    setNotes(updatedNotes);
    setEditTaskId(null);
    setEditText("");
  }

  const filteredNotes = notes.filter(note => {
    if (filter === "all") return true;
    if (filter === "pending") return note.isPending;
    if (filter === "completed") return !note.isPending;
  });

  function togglePendingStatus(id) {
    const updated = notes.map(note =>
      note.id === id ? { ...note, isPending: !note.isPending } : note
    );
    setNotes(updated);
  }

  function cancelEdit() {
    setEditTaskId(null);
    setEditText("");
  }

  function togglePin(id) {
    const updated = notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updated);
  }

  const sortedFilteredNotes = filteredNotes.sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });


  return (
    <>
      <Header filter={filter} setFilter={setFilter}/>
      <Input onAdd={addNote}/>
      <div className="cardWrapper">
        {sortedFilteredNotes.map((item) => (
          <Card 
            key={item.id}
            id={item.id}
            content={item.content}
            isPinned={item.isPinned}
            isPending={item.isPending}
            time={item.time}
            edited={item.edited}
            onpin={togglePin}
            ontoggle={togglePendingStatus}
            ondelete={deleteNote}
            onedit={editNote}
            onsave={saveEditNote}
            canceledit={cancelEdit}
            isEditing={editTaskId === item.id}
            editData={editText}
            setEditData={setEditText}
          />
        ))}
      </div>
    </>
  )
}

export default App
