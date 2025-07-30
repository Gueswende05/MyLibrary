const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = isRead;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  displayLibrary();
}

function displayLibrary() {
  const container = document.getElementById('libraryDisplay');
  container.innerHTML = '';

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';

    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
          <p class="card-text">Pages: ${book.pages}<br>Read: <strong>${book.read ? 'Yes' : 'No'}</strong></p>
          <div class="mt-auto">
            <button class="btn btn-sm btn-outline-success me-2 toggle-read">Toggle Read</button>
            <button class="btn btn-sm btn-outline-danger delete-book">Delete</button>
          </div>
        </div>
      </div>
    `;

    const toggleBtn = card.querySelector('.toggle-read');
    const deleteBtn = card.querySelector('.delete-book');

    toggleBtn.addEventListener('click', () => {
      book.toggleRead();
      displayLibrary();
    });

    deleteBtn.addEventListener('click', () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayLibrary();
      }
    });

    container.appendChild(card);
  });
}

// Handle form submission
document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  if (title && author && !isNaN(pages)) {
    addBookToLibrary(title, author, pages, read);
    this.reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
    modal.hide();
  }
});

// Add some sample books
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, true);
addBookToLibrary("1984", "George Orwell", 328, false);
