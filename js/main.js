import NotesView from "./notesView.js"
import NotesAPI from "./notesAPI.js"

const app = document.getElementById("app");
const view = new NotesView(app, {
    onNoteAdd() {
        console.log("Adding a new note!");
        
        
    },
    onNoteSelect(id) {
        console.log("Note Selected: " + id)
    },
    OnNoteDelete() {
        console.log("Note deleted!" + id);
    }, 

    onNoteEdit(newTitle, newBody) {
        console.log(newTitle);
        console.log(newBody);
    },
});

view.updateNotesList(NotesAPI.getAllNotes());