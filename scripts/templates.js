function getNoteTemplate(indexNote) {
  return /*html*/ `
    <div class="notes">
        <h3 ondblclick="updateNote(${indexNote})">${allNotes.notesTitles[indexNote]}</h3> <br> 
        <p>${allNotes.notes[indexNote]}</p>
        <div class="notes_buttons">
            <button onclick="moveNotes(${indexNote}, 'notes', 'trashNotes')">X</button>
            <button onclick="moveNotes(${indexNote}, 'notes', 'archiveNotes')"><img src="./assets/icons/folder_icon.svg" alt="Folder Icon"></button>
        </div> 
    </div>
    `;
}

function getTrashNoteTemplate(indexTrashNote) {
  return /*html*/ `
      <div class="notes">
          <h3>${allNotes.trashNotesTitles[indexTrashNote]}</h3> 
          <p>${allNotes.trashNotes[indexTrashNote]}</p>
          <div class="notes_buttons"> 
              <button onclick="deleteNote(${indexTrashNote}, 'trash')">X</button>
              <button onclick="moveNotes(${indexTrashNote}, 'trash', 'notes')"><img src="assets/icons/icon_stickynote.svg" alt="Folder Icon"></button>
          </div>
      </div>
      `;
}

function getArchiveNoteTemplate(indexArchiveNote) {
  return /*html*/ `
    <div class="notes">
        <h3>${allNotes.archiveNotesTitles[indexArchiveNote]}</h3> 
        <p>${allNotes.archiveNotes[indexArchiveNote]}</p>
        <div class="notes_buttons"> 
            <button onclick="moveNotes(${indexArchiveNote}, 'archive', 'trash')">X</button>
            <button onclick="moveNotes(${indexArchiveNote}, 'archive', 'notes')"><img src="assets/icons/icon_stickynote.svg" alt="Folder Icon"></button>
        </div>
    </div>
    `;
}
