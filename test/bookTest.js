const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const request = require("supertest");
const app = require("../server");

describe("GET /books", () => {
    it("return list of books", () => {
        return request(app)
            .get("/api/v1/books")
            .expect(200)
            .expect((res) => {
                console.log(`Book List: ${JSON.stringify(res.body)}`);
            });
    });
});

describe("POST /books/add", () => {
    it("add a new book", () => {
        const bookData = {
            bookTitle: "You don't now javaScript",
            bookDescription: "bla bla bla bla bla bla bla bla bla bla bla bla",
            bookAuthor: "Mohamed",
            bookPublisher: "USA",
            bookPages: 500,
            storeCode: "RSMXCUNLTO",
        };

        return request(app)
            .post("/api/v1/books/add")
            .send(bookData)
            .expect(201)
            .expect((res) => {
                console.log(res.statusType);
            });
    });
});
