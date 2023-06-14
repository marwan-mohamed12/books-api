exports.Book = class Book {
    constructor(bookId, title, isbn, description, puplisher, author, pages) {
        this.bookId = bookId;
        this.title = title;
        this.isbn = isbn;
        this.description = description;
        this.puplisher = puplisher;
        this.author = author;
        this.pages = pages;
    }
};
