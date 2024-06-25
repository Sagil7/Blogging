const noteForm = document.getElementById('noteForm');
const notesContainer = document.getElementById('notes');

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('http://localhost:3000/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  });

  const newNote = await response.json();
  renderNote(newNote);

  noteForm.reset();
});

async function fetchNotes() {
  const response = await fetch('http://localhost:3000/notes');
  const notes = await response.json();
  notes.forEach(note => renderNote(note));
}

function renderNote(note) {
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');
  noteDiv.setAttribute('data-id', note._id);

  const noteTitle = document.createElement('h2');
  noteTitle.textContent = note.title;

  const noteContent = document.createElement('p');
  noteContent.textContent = note.content;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteNote(note._id);

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(deleteButton);

  notesContainer.appendChild(noteDiv);
}

async function deleteNote(id) {
  await fetch(`http://localhost:3000/notes/${id}`, {
    method: 'DELETE'
  });

  document.querySelector(`[data-id='${id}']`).remove();
}

fetchNotes();
