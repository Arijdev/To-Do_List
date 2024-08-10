document.addEventListener('DOMContentLoaded', function() {
    const notesContainer = document.getElementById('notesContainer');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    const renderNotes = () => {
      notesContainer.innerHTML = '';
      notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'col-md-4 mb-4';
        noteElement.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${note.title}</h5>
              <p class="card-text">${note.content}</p>
              <button class="btn btn-warning btn-sm editNoteButton" data-index="${index}">Edit</button>
              <button class="btn btn-danger btn-sm deleteNoteButton" data-index="${index}">Delete</button>
            </div>
          </div>
        `;
        notesContainer.appendChild(noteElement);
      });
    };
  
    const saveNotes = () => {
      localStorage.setItem('notes', JSON.stringify(notes));
    };
  
    document.getElementById('addNoteButton').addEventListener('click', function() {
      const title = document.getElementById('titleInput').value.trim();
      const content = document.getElementById('contentInput').value.trim();
  
      if (title !== '' && content !== '') {
        notes.push({ title, content });
        saveNotes();
        renderNotes();
        document.getElementById('titleInput').value = '';
        document.getElementById('contentInput').value = '';
      }
    });
  
    notesContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('deleteNoteButton')) {
        const index = e.target.getAttribute('data-index');
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
      }
  
      if (e.target.classList.contains('editNoteButton')) {
        const index = e.target.getAttribute('data-index');
        document.getElementById('titleInput').value = notes[index].title;
        document.getElementById('contentInput').value = notes[index].content;
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
      }
    });
  
    // Render existing notes on page load
    renderNotes();
  });
  