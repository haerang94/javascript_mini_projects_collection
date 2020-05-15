class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    //Create tr element
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }
  showAlert(message, className) {
    //Create div
    const div = document.createElement("div");
    //Add classses
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    //Insert alert
    container.insertBefore(div, form);

    //   time out after 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    console.log(books);
    books.forEach((book) => {
      console.log(book.title, book.author);
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  //   console.log(title, author, isbn);

  const book = new Book(title, author, isbn);
  //   console.log(book);

  // Instantiate UI
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to LIST
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    // show success
    ui.showAlert("Book Added!", "success");
    //Clear fields
    ui.clearFields();
  }
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  e.preventDefault();

  const ui = new UI();
  ui.deleteBook(e.target);

  // remove from LS
  // pass isbn
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //   show alert
  ui.showAlert("Book Removed!", "success");
  //   console.log(e.target.parentElement.parentElement);
});
