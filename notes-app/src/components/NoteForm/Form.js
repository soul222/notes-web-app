import NoteStorage from "../../utils/Storage.js";
import FormValidation from "../../handlers/FormValidation.js";
import FormStyled from "./Form.styled.js";


class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector("form");
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");
    const inputs = [titleInput, bodyInput];

    titleInput.addEventListener("input", () =>
      FormValidation.validateInput(titleInput)
    );
    bodyInput.addEventListener("input", () =>
      FormValidation.validateInput(bodyInput)
    );

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (FormValidation.validateForm(inputs)) {
        const note = {
          id: `notes-${Date.now()}`,
          title: titleInput.value.trim(),
          body: bodyInput.value.trim(),
          createdAt: new Date().toISOString(),
          archived: false,
        };

        NoteStorage.addNote(note);
        document.dispatchEvent(new CustomEvent("notes-updated"));
        form.reset();
        FormValidation.resetValidation(inputs);
      }
    });

    const textarea = this.shadowRoot.querySelector("textarea");
    const maxHeight = 200;
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(newHeight, maxHeight)}px`;
    });
  }

  render() {
    const formType = this.getAttribute("data-form-type") || "Add Note";
    this.shadowRoot.innerHTML = `
      <style>${FormStyled}</style>
      <form>
        <input type="text" id="title" placeholder="Title" required />
        <div id="title-error" class="error-message"></div>

        <textarea
          id="body"
          rows="4"
          cols="50"
          placeholder="Note Content"
          required
        ></textarea>
        <div id="body-error" class="error-message"></div>

        <button type="submit">${formType}</button>
      </form>
    `;
  }
}

customElements.define("note-form", NoteForm);

export default NoteForm;
