document.addEventListener("DOMContentLoaded", () => {
  displaySelectedNote();
});

function displaySelectedNote(): void {
  const noteJson = localStorage.getItem("selectedNote");
  if (noteJson) {
    const note: Note = JSON.parse(noteJson);

    const container = document.querySelector(".container");
    if (!container) return;

    // Clear the container or ensure it's empty
    container.innerHTML = "";

    // Dynamically create the notecard element with note details
    const noteElement = document.createElement("div");
    noteElement.className = "notecard";
    noteElement.innerHTML = `
        <h2 class="Title">${note.title}</h2>
        <p class="content">${note.description}</p>
        <p class="Date">${note.date}</p>
        <div class="buttons">
          <button class="Edit">Edit</button>
          <button class="Delete">Delete</button>
        </div>
      `;
    container.appendChild(noteElement);

    
    document.querySelector(".Edit")?.addEventListener("click", () => {
     
      window.location.href = `add.html`;
    });

    document.querySelector(".Delete")?.addEventListener("click", () => {
      // Confirm deletion
      const confirmDelete = confirm(
        "Are you sure you want to delete this note?"
      );
      if (confirmDelete) {
        // Remove the note from local storage and redirect to index.html
        localStorage.removeItem("selectedNote");
        deleteNoteById(note.id);
      }
    });
  } else {
    console.log("No note found");
  }
}

function deleteNoteById(noteId: number): void {
  const notes = getNotes().filter((note) => note.id !== noteId);
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
}
