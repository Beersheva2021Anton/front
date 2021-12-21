export default class Spinner {
    #spinnerElement
    constructor(spinnerId) {
        this.#spinnerElement = document.getElementById(spinnerId);
        if (!this.#spinnerElement) {
            throw "Wrong spinner id";
        }
    }
    show() {
        this.#spinnerElement.innerHTML = 
            '<div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>';
    }
    hide() {
        this.#spinnerElement.innerHTML = '';
    }
}