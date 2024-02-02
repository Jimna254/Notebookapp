interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
}

function getNotes(): Note[] {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
}

function saveNote(note: Omit<Note, "id">): void {
  const notes = getNotes();
  const newNote: Note = {
    ...note,
    id: notes.length + 1,
  };
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes(): void {
  if (document.querySelector(".container")) {
    const notesContainer = document.querySelector(".container")!;
    const notes = getNotes();
    notesContainer.innerHTML = "";
    notes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.className = "notecard";
      noteElement.innerHTML = `
          <h2 class="Title">${note.title}</h2>
          <p class="content">${note.description}</p>
          <p class="Date">${note.date}</p>
        `;
      notesContainer.appendChild(noteElement);
    });
  }
}

if (window.location.pathname.endsWith("add.html")) {
  document.getElementById("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("desc") as HTMLTextAreaElement)
      .value;
    const date = (document.getElementById("date") as HTMLInputElement).value;
    saveNote({ title, description, date });
    alert("Note added!");
    window.location.href = "index.html";
  });
} else {
  displayNotes();
}
