let myLibrary = [];
var index = 0;

function Book()
{
    this.title;
    this.author;
    this.pages;
    this.read;
}

function addBookToLibrary(book)
{
    myLibrary.push(book);
    console.log(myLibrary);
}


function addToTable(book)
{
    var row = document.createElement("tr")
    row.setAttribute('data-index', index)
    var titleEntry = document.createElement("td")
    var authorEntry = document.createElement("td")
    var pagesEntry = document.createElement("td")
    var readEntry =  document.createElement("td")
    titleEntry.setAttribute("class", "title")
    authorEntry.setAttribute("class", "author")
    pagesEntry.setAttribute("class", "pages")
    readEntry.setAttribute("class", "read")
    titleEntry.textContent = book.title
    authorEntry.textContent = book.author
    pagesEntry.textContent = book.pages
    readEntry.textContent = book.read

    var entries = [titleEntry, authorEntry, pagesEntry, readEntry]
    entries.forEach(entry =>
        {
            row.appendChild(entry)
        })
    var removeButton = document.createElement("button")
    removeButton.textContent = "Remove Book"
    removeButton.addEventListener("click", removeBook)
    row.appendChild(removeButton)

    var readButton = document.createElement("button")
    readButton.textContent = "Read Book"
    readButton.addEventListener("click", readBook)
    row.appendChild(readButton)

    books.appendChild(row)
    index+=1
}

function addBook(e)
{
    var title = prompt("Title of book:")
    var author = prompt("Author of book:")
    var pages = prompt("Number of pages in book:")
    var read = prompt("Have you read this book?")
    function NewBook(){
    }
    NewBook.prototype = Object.create(Book.prototype)
    NewBook.title = title;
    NewBook.author = author;
    NewBook.pages = pages;
    NewBook.read = read;
    addBookToLibrary(NewBook)
    addToTable(NewBook)
}

function removeBookFromLibrary(indexToRemove)
{
    myLibrary.splice(indexToRemove, 1)
    console.log(myLibrary);
}

function removeFromTable(book, indexToRemove)
{
    books.removeChild(book)
    index-=1 // one less book in library
    var allBooks = Array.from(books.children) // decrement indices for elements following deleted one
    allBooks.forEach(childBook => {
        if (childBook.getAttribute("data-index") > indexToRemove)
        childBook.setAttribute("data-index", childBook.getAttribute("data-index") - 1)
    })
}

function removeBook(e)
{
    var book = e.target.parentNode
    var indexToRemove = book.getAttribute("data-index")
    removeBookFromLibrary(indexToRemove)
    removeFromTable(book, indexToRemove)
}

function readBook(e)
{
    var book = e.target.parentNode
    var indexToSetRead = book.getAttribute("data-index")
    var bookToSetRead = myLibrary[indexToSetRead]
    bookToSetRead.read = "Yes!"
    var entryToSetRead = book.querySelector(".read")
    entryToSetRead.textContent = "Yes!"
}

const books = document.querySelector("#books")
const addButton = document.querySelector("#addButton")
addButton.addEventListener("click", addBook)