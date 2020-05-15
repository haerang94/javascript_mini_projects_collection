//Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  //   console.log(bookObj);
  const list = document.getElementById("book-list");

  //Create tr element
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

  list.appendChild(row);
};

// show alert

UI.prototype.showAlert = function(message, className) {
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
};

// Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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
  //   show alert
  ui.showAlert("Book Removed!", "success");
  //   console.log(e.target.parentElement.parentElement);
});
