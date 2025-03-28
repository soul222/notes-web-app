import NoteStorage from "../../utils/Storage.js";
import ItemsStyled from "./ItemsStyled.js";

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

    // Tambahkan stylesheet
    const style = document.createElement('style');
    style.textContent = ItemsStyled;
    
    // Buat elemen wrapper untuk konten
    const wrapper = document.createElement('div');
    wrapper.classList.add('note-card');
    wrapper.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <span class="created-at">Created on: ${createdAt}</span>
      <div class="note-actions">
        <button class="archive-btn" title="Archive Note">
          <i class="bi bi-archive"></i>
        </button>
        <button class="delete-btn" title="Delete Note">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    // Bersihkan shadow root dan tambahkan style dan wrapper
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);

    // Tambahkan event listener
    this.shadowRoot
      .querySelector(".archive-btn")
      .addEventListener("click", () => {
        NoteStorage.archiveNote(note.id);
        document.dispatchEvent(new CustomEvent("notes-updated"));
      });

    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        Swal.fire({
          title: "Are you sure?",
          text: "This note will be permanently deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--success)",
          cancelButtonColor: "var(--danger)",
          confirmButtonText: "Yes, delete!",
        }).then((result) => {
          if (result.isConfirmed) {
            NoteStorage.deleteNote(note.id);
            document.dispatchEvent(new CustomEvent("notes-updated"));
          }
        });
      });
  }
}

customElements.define("note-item", NoteItem);
export default NoteItem;