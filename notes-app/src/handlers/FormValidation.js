export default class FormValidation {
  static validateInput(input) {
    const value = input.value.trim();
    const errorElement = document.querySelector(`#${input.id}-error`);

    if (value === "") {
      errorElement.textContent = `${input.placeholder} is required`;
      input.classList.add("invalid");
      return false;
    }

    if (input.id === "title" && value.length > 50) {
      errorElement.textContent = "Title cannot be longer than 50 characters";
      input.classList.add("invalid");
      return false;
    }

    if (input.id === "body" && value.length > 500) {
      errorElement.textContent =
        "Note content cannot be longer than 500 characters";
      input.classList.add("invalid");
      return false;
    }

    errorElement.textContent = "";
    input.classList.remove("invalid");
    return true;
  }

  static validateForm(inputs) {
    return inputs.every((input) => this.validateInput(input));
  }

  static resetValidation(inputs) {
    inputs.forEach((input) => {
      const errorElement = document.querySelector(`#${input.id}-error`);
      input.classList.remove("invalid");
      errorElement.textContent = "";
    });
  }
}
