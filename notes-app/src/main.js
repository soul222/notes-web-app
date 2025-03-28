import './components/Navbar/Navbar.js';
import './components/Navbar/Search.js';
import './components/NoteForm/Form.js';
import './components/NotesItem/Items.js';
import './components/NoteList/List.js';
import './components/NoteList/ArchiveList.js';
// import { NoteList, NoteArchiveList } from './components/List.js';
import notesData from './utils/notesData.js';
import NoteStorage from './utils/Storage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize notes if localStorage is empty
  if (NoteStorage.getNotes().length === 0) {
    notesData.forEach(note => NoteStorage.addNote(note));
  }
});