export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes_sidebar">
                <button class="notes_add" type="button">Add Note</button>
                <div class="notes_list"></div>
            </div>
            <div class="notes_preview">
                <input class="notes_title" type="text" placeholder="New Note...">
                <textarea class="notes_body">Take Note...</textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes_add");
        const inpTitle = this.root.querySelector(".notes_title");
        const inpBody = this.root.querySelector(".notes_body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes_list-item" data-note-id="${id}">
                <div class="notes_small-title">${title}</div>
                <div class="notes_small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes_small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNotesList(notes) {
        const notesListContainer = this.root.querySelector(".notes_list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes_list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes_title").value = note.title;
        this.root.querySelector(".notes_body").value = note.body;

        this.root.querySelectorAll(".notes_list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes_list-item-selected");
        });

        this.root.querySelector(`.notes_list-item[data-note-id="${note.id}"]`).classList.add("notes_list-item-selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes_preview").style.visibility = visible ? "visible" : "hidden";
    }
}