import NotesView from "./notesView.js"

const app = document.getElementById("app");
const view = new NotesView(app, {
    onNoteAdd() {
        console.log("Adding a new note!");
    },
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle);
        console.log(newBody);
    },
});