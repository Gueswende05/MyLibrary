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
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <strong>${book.title}</strong><br>
      Auteur : ${book.author}<br>
      Pages : ${book.pages}<br>
      Lu : ${book.read ? 'Oui' : 'Non'}<br>
    `;

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Changer statut';
    toggleBtn.addEventListener('click', () => {
      book.toggleRead();
      displayLibrary();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayLibrary();
      }
    });

    card.appendChild(toggleBtn);
    card.appendChild(deleteBtn);

    container.appendChild(card);
  });
}

// Gérer le formulaire
document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  if (title && author && !isNaN(pages)) {
    addBookToLibrary(title, author, pages, read);
    this.reset();
    document.getElementById('newBookDialog').close();
  }
});

document.getElementById('newBookBtn').addEventListener('click', () => {
  document.getElementById('newBookDialog').showModal();
});

document.getElementById('closeDialogBtn').addEventListener('click', () => {
  document.getElementById('newBookDialog').close();
});

// Ajouter quelques livres pour tester
addBookToLibrary("Le Petit Prince", "Antoine de Saint-Exupéry", 96, true);
addBookToLibrary("1984", "George Orwell", 328, false);
