import NoteStorage from '../../utils/Storage.js';
import '../NotesItem/Items.css';

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set note(note) {
    this.noteData = note;
    this.render();
  }

  render() {
    const note = this.noteData;
    const createdAt = new Date(note.createdAt).toLocaleString();

    this.shadowRoot.innerHTML = `
      <div class="note-card">
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <span class="created-at">Created on: ${createdAt}</span>
        <div class="note-actions">
          <button class="archive-btn" title="Archive">
            <i class="bi bi-archive"></i>
          </button>
          <button class="delete-btn" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector(".archive-btn").addEventListener("click", () => {
      NoteStorage.archiveNote(note.id);
      document.dispatchEvent(new CustomEvent('notes-updated'));
    });

    this.shadowRoot.querySelector(".delete-btn").addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "This note will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--success)",
        cancelButtonColor: "var(--danger)",
        confirmButtonText: "Yes, delete!"
      }).then((result) => {
        if (result.isConfirmed) {
          NoteStorage.deleteNote(note.id);
          document.dispatchEvent(new CustomEvent('notes-updated'));
        }
      });
    });
  }
}

customElements.define("note-item", NoteItem);

export default NoteItem;