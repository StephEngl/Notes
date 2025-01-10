function getNoteTemplate(indexNote) {
  return /*html*/ `
    <div class="notes">
        <h3 ondblclick="updateNote(${indexNote})">${notesTitles[indexNote]}</h3> <br> 
        <p>${notes[indexNote]}</p>
        <div class="notes_buttons">
            <button onclick="transferToTrash(${indexNote}, 'notes')">X</button>
            <button onclick="transferToArchive(${indexNote}, 'notes')"><img src="./assets/icons/folder_icon.svg" alt="Folder Icon"></button>
        </div> 
    </div>
    `;
}

function getTrashNoteTemplate(indexTrashNote) {
  return /*html*/ `
      <div class="notes">
          <h3>${trashNotesTitles[indexTrashNote]}</h3> 
          <p>${trashNotes[indexTrashNote]}</p>
          <div class="notes_buttons"> 
              <button onclick="deleteNote(${indexTrashNote}, 'trash')">X</button>
              <button onclick="transferToNotes(${indexTrashNote}, 'trash')"><img src="assets/icons/icon_stickynote.svg" alt="Folder Icon"></button>
          </div>
      </div>
      `;
}

function getArchiveNoteTemplate(indexArchiveNote) {
  return /*html*/ `
    <div class="notes">
        <h3>${archiveNotesTitles[indexArchiveNote]}</h3> 
        <p>${archiveNotes[indexArchiveNote]}</p>
        <div class="notes_buttons"> 
            <button onclick="transferToTrash(${indexArchiveNote}, 'archive')">X</button>
            <button onclick="transferToNotes(${indexArchiveNote}, 'archive')"><img src="assets/icons/icon_stickynote.svg" alt="Folder Icon"></button>
        </div>
    </div>
    `;
}
