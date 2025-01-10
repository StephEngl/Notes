let allNotes = {
  notesTitles: ["Brot kaufen", "Ausmessen", "Schwimmkurs"],
  notes: [
    "Vollkornfeinbrot, geschnitten",
    "Füße Kinder: 18cm und 20cm",
    "Freitag, 15:30Uhr",
  ],
  trashNotesTitles: [],
  trashNotes: [],
  archiveNotesTitles: [],
  archiveNotes: [],
};

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
  let contentDialogRef = document.getElementById("content_dialog");
  contentDialogRef.innerHTML = "";
  for (
    let indexNote = 0;
    indexNote < allNotes.notesTitles.length;
    indexNote++
  ) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
    contentDialogRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash_content");
  trashContentRef.innerHTML = "";
  for (
    let indexTrashNote = 0;
    indexTrashNote < allNotes.trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archive_content");
  archiveContentRef.innerHTML = "";

  for (
    let indexArchiveNote = 0;
    indexArchiveNote < allNotes.archiveNotes.length;
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
  if (origin == "trashNotes") {
    localStorage.setItem("trashNotes", JSON.stringify(notesArray));
    localStorage.setItem("trashNotesTitles", JSON.stringify(titlesArray));
  }
  if (origin == "archiveNotes") {
    localStorage.setItem("archiveNotes", JSON.stringify(notesArray));
    localStorage.setItem("archiveNotesTitles", JSON.stringify(titlesArray));
  }
}

// Get from local storage
function getFromLocalStorage(notesArray, titlesArray, origin) {
  let myTitlesArr = JSON.parse(localStorage.getItem(titlesArray));
  let myArr = JSON.parse(localStorage.getItem(notesArray));
  if (origin == "notes" && myTitlesArr != null && myArr != null) {
    allNotes.notesTitles = myTitlesArr;
    allNotes.notes = myArr;
  }
  if (origin == "trash" && myTitlesArr != null && myArr != null) {
    allNotes.trashNotesTitles = myTitlesArr;
    allNotes.trashNotes = myArr;
  }
  if (origin == "archive" && myTitlesArr != null && myArr != null) {
    allNotes.archiveNotesTitles = myTitlesArr;
    allNotes.archiveNotes = myArr;
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
  allNotes.notes.push(noteInput);
  allNotes.notesTitles.push(noteTitleInput);
  saveToLocalStorage(allNotes.notes, allNotes.notesTitles, "notes");
  renderNotes();
  noteInputRef.value = "";
  noteTitleRef.value = "";
}

function moveNotes(indexNote, startKey, destinationKey) {
  let note = allNotes[startKey].splice(indexNote, 1);
  allNotes[destinationKey].push(note[0]);

  let notesTitle = allNotes[startKey + "Titles"].splice(indexNote, 1);
  allNotes[destinationKey + "Titles"].push(notesTitle[0]);

  saveToLocalStorage(allNotes[startKey], allNotes[startKey + "Titles"], startKey);
  saveToLocalStorage(allNotes[destinationKey], allNotes[destinationKey + "Titles"], destinationKey);
  renderNotes();
  renderTrashNotes();
  renderArchiveNotes();
}


// Delete Notes for all
function deleteNote(indexNote) {
  allNotes.trashNotes.splice(indexNote, 1);
  allNotes.trashNotesTitles.splice(indexNote, 1);
  saveToLocalStorage(allNotes.trashNotes, allNotes.trashNotesTitles, "trash");
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
  renderNotes();
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
