interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
}

(() => {
  function getNotes(): Note[] {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  }

  function displayNoteDetails(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = parseInt(urlParams.get("id") || "0", 10);
    const note = getNoteById(noteId);

    if (note) {
      document.querySelector(".Title")!.textContent = note.title;
      document.querySelector(".content")!.textContent = note.description;
      document.querySelector(".Date")!.textContent = note.date;
    } else {
      console.log("Note not found");
    }
  }

  function getNoteById(noteId: number): Note | undefined {
    const notes = getNotes();
    return notes.find((note) => note.id === noteId);
  }

  function deleteNoteById(noteId: number): void {
    let notes = getNotes();
    notes = notes.filter((note) => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(notes));

    window.location.href = "index.html";
  }

  function addEventListeners(noteId: number): void {
    document.querySelector(".Edit")?.addEventListener("click", () => {
      window.location.href = `add.html?id=${noteId}`;
    });

    document.querySelector(".Delete")?.addEventListener("click", () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this note?"
      );
      if (confirmDelete) {
        deleteNoteById(noteId);
      }
    });
  }

  function init(): void {
    displayNoteDetails();
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = parseInt(urlParams.get("id") || "0", 10);
    if (noteId) {
      addEventListeners(noteId);
    }
  }

  init();
})();
