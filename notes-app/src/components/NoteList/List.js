import NoteStorage from "../../utils/Storage.js";
import "../NoteList/";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notesData = [];
  }

  connectedCallback() {
    this.loadNotes();
    document.addEventListener("notes-updated", () => this.loadNotes());
    document.addEventListener("search-note", (event) =>
      this.handleSearch(event)
    );
  }

  loadNotes() {
    this.notesData = NoteStorage.getNotes().filter((note) => !note.archived);
    this.render();
  }

  handleSearch(event) {
    const query = event.detail.toLowerCase();
    const allNotes = NoteStorage.getNotes().filter((note) => !note.archived);

    this.notesData = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query)
    );

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="note-list">
        ${
          this.notesData.length > 0
            ? this.notesData
                .map(
                  (note) => `
              <note-item id="${note.id}"></note-item>
            `
                )
                .join("")
            : `
            <div class="empty-state">
              <p>No notes found. Create your first note!</p>
            </div>
          `
        }
      </div>
    `;

    this.notesData.forEach((note) => {
      const noteElement = this.shadowRoot.querySelector(`#${note.id}`);
      if (noteElement) {
        noteElement.note = note;
      }
    });
  }
}

customElements.define("note-list", NoteList);

export default NoteList;
