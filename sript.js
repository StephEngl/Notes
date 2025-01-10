let notesTitles = ["Brot kaufen", "Ausmessen", "Schwimmkurs"];
let notes = [
  "Vollkornfeinbrot, geschnitten",
  "Füße Kinder: 18cm und 20cm",
  "Freitag, 15:30Uhr",
];

let trashNotesTitles = [];
let trashNotes = [];

let archiveNotesTitles = [];
let archiveNotes = [];

function init() {
  getFromLocalStorage("notes", "notesTitles", "notes");
  getFromLocalStorage("trashNotes", "trashNotesTitles", "trash");
  getFromLocalStorage("archiveNotes", "archiveNotesTitles", "archive");
  renderNotes();
  renderTrashNotes();
  renderArchiveNotes();
}

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notesTitles.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderDialogNotes() {
  let contentDialogRef = document.getElementById("content_dialog");
  contentDialogRef.innerHTML = "";
  for (let indexNote = 0; indexNote < notesTitles.length; indexNote++) {
    contentDialogRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash_content");
  trashContentRef.innerHTML = "";
  for (
    let indexTrashNote = 0; indexTrashNote < trashNotes.length;
    indexTrashNote++) {
    trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archive_content");
  archiveContentRef.innerHTML = "";

  for (
    let indexArchiveNote = 0;
    indexArchiveNote < archiveNotes.length;
    indexArchiveNote++
  ) {
    archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
  }
}

// Save to local storage
function saveToLocalStorage(notesArray, titlesArray, origin) {
  if (origin == "notes") {
  localStorage.setItem("notes", JSON.stringify(notesArray));
  localStorage.setItem("notesTitles", JSON.stringify(titlesArray));
  }
  if (origin == "trash") {
    localStorage.setItem("trashNotes", JSON.stringify(notesArray));
    localStorage.setItem("trashNotesTitles", JSON.stringify(titlesArray));
  }
  if (origin == "archive") {
    localStorage.setItem("archiveNotes", JSON.stringify(notesArray));
    localStorage.setItem("archiveNotesTitles", JSON.stringify(titlesArray));
  }
}

// Get from local storage
function getFromLocalStorage(notesArray, titlesArray, origin) {
  let myTitlesArr = JSON.parse(localStorage.getItem(titlesArray));
  let myArr = JSON.parse(localStorage.getItem(notesArray));
  if (origin == "notes" && myTitlesArr != null && myArr != null) {
    notesTitles = myTitlesArr;
    notes = myArr;
  }
  if (origin == "trash"  && myTitlesArr != null && myArr != null) {
    trashNotesTitles = myTitlesArr;
    trashNotes = myArr;
  }
  if (origin == "archive"  && myTitlesArr != null && myArr != null) {
    archiveNotesTitles = myTitlesArr;
    archiveNotes = myArr;
  }
}


// add notes
function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value;
  let noteTitleRef = document.getElementById("note_title_input");
  let noteTitleInput = noteTitleRef.value;
  if (noteInput == "" || noteTitleInput == "") {
    return;
  }
  notes.push(noteInput);
  notesTitles.push(noteTitleInput);
  saveToLocalStorage(notes, notesTitles, "notes")
  renderNotes();
  noteInputRef.value = "";
  noteTitleRef.value = "";
}

// Transfer to Trash notes from Notes or Archive
function transferToTrash(indexTrash, origin) {
  if (origin == "notes") {
    let trashNote = notes.splice(indexTrash, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitles.splice(indexTrash, 1);
    trashNotesTitles.push(trashNoteTitle[0]);
    saveToLocalStorage(notes, notesTitles, "notes")
  }
  if (origin == "archive") {
    let trashNote = archiveNotes.splice(indexTrash, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = archiveNotesTitles.splice(indexTrash, 1);
    trashNotesTitles.push(trashNoteTitle[0]);
    saveToLocalStorage(archiveNotes, archiveNotesTitles, "archive")
  }
  saveToLocalStorage(trashNotes, trashNotesTitles, "trash")
  renderNotes();
  renderTrashNotes();
  renderArchiveNotes();
}

// Transfer to Archive from Notes
function transferToArchive(indexNote) {
  let archiveNote = notes.splice(indexNote, 1);
  archiveNotes.push(archiveNote[0]);
  let archiveNotesTitle = notesTitles.splice(indexNote, 1);
  archiveNotesTitles.push(archiveNotesTitle[0]);
  saveToLocalStorage(notes, notesTitles, "notes")
  saveToLocalStorage(archiveNotes, archiveNotesTitles, "archive")
  renderNotes();
  renderArchiveNotes();
}

// Transfer to Notes from trash or archive
function transferToNotes(indexNotes, origin) {
  if (origin == "trash") {
    let note = trashNotes.splice(indexNotes, 1);
    notes.push(note[0]);
    let notesTitle = trashNotesTitles.splice(indexNotes, 1);
    notesTitles.push(notesTitle[0]);
    saveToLocalStorage(notes, notesTitles, "trash")
  }
  if (origin == "archive") {
    let note = archiveNotes.splice(indexNotes, 1);
    notes.push(note[0]);
    let notesTitle = archiveNotesTitles.splice(indexNotes, 1);
    notesTitles.push(notesTitle[0]);
    saveToLocalStorage(archiveNotes, archiveNotesTitles, "archive")
  }
  saveToLocalStorage(notes, notesTitles, "notes")
  renderNotes();
  renderTrashNotes();
  renderArchiveNotes();
}

// Delete Notes for all
function deleteNote(indexNote) {
  trashNotes.splice(indexNote, 1);
  trashNotesTitles.splice(indexNote, 1);
  saveToLocalStorage(trashNotes, trashNotesTitles, "trash")
  renderTrashNotes();
}

// Update Notes
function updateNote(indexUpdate) {
  document.getElementById("note_title_input").value = notesTitles[indexUpdate];
  document.getElementById("note_input").value = notes[indexUpdate];
}


// Open Dialog
// Notes
function openNotesDialog() {
  let refOverlay = document.getElementById("overlay_notes");
  refOverlay.showModal();
  renderDialogNotes();
}

function closeNotesDialog(event) {
  const dialog = document.getElementById("overlay_notes");
  if (event.target === dialog) {
    dialog.close();
  }
}

// Trash
function openTrashDialog() {
  let refOverlay = document.getElementById("overlay_trash");
  refOverlay.showModal();
  renderTrashNotes();
}

function closeTrashDialog(event) {
  const dialog = document.getElementById("overlay_trash");
  if (event.target === dialog) {
    dialog.close();
  }
}

// Archive
function openArchiveDialog() {
  let refOverlay = document.getElementById("overlay_archive");
  refOverlay.showModal();
  renderTrashNotes();
}

function closeArchiveDialog(event) {
  const dialog = document.getElementById("overlay_archive");
  if (event.target === dialog) {
    dialog.close();
  }
}
