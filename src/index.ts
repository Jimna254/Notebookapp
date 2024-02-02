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
  const notesContainer = document.querySelector(".container");
  if (notesContainer) {
    notesContainer.innerHTML = "";
    const notes = getNotes();

    notes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.className = "notecard";
      noteElement.innerHTML = `
          <h2 class="Title">${note.title}</h2>
          <p class="content">${note.description}</p>
          <p class="Date">${note.date}</p>
        `;

      const viewButton = document.createElement("button");
      viewButton.textContent = "ViewItem";
      viewButton.className = "view-item";
      noteElement.appendChild(viewButton);

      notesContainer.appendChild(noteElement);

      viewButton.addEventListener("click", () => {
        localStorage.setItem("selectedNote", JSON.stringify(note));
        window.location.href = `note.html`;
      });
    });
  }
}

if (window.location.pathname.endsWith("add.html")) {
  const form = document.getElementById("form");
  form?.addEventListener("submit", (e) => {
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
