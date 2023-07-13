exports.queryList = {
    GET_STORES_LIST_QUERY:
        "SELECT store_id, store_name, store_code, created_on, created_by, address FROM books_mangement_system.store",
    ADD_STORE_QUERY:
        "INSERT INTO books_mangement_system.STORE (STORE_NAME, STORE_CODE, CREATED_ON , CREATED_BY , ADDRESS) VALUES($1, $2, $3, $4, $5)",
    DELETE_STORE_QUERY:
        "DELETE FROM books_mangement_system.STORE WHERE STORE_ID = $1",
    EDIT_STORE_QUERY:
        "UPDATE books_mangement_system.STORE SET STORE_NAME = $1, ADDRESS = $2 WHERE STORE_ID = $3",
    GET_BOOKS_LIST_QUERY:
        "SELECT BOOK_ID, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUPLISHER FROM BOOKS_MANGEMENT_SYSTEM.BOOK;",
    GET_BOOK_DETAILS_QUERY: `
                SELECT BOOK_ID, BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUPLISHER, BOOK_PAGES, BOOK.STORE_CODE, 
                STORE.STORE_CODE, STORE.ADDRESS
                FROM BOOKS_MANGEMENT_SYSTEM.BOOK 
                INNER JOIN BOOKS_MANGEMENT_SYSTEM.STORE ON BOOK.STORE_CODE = STORE.STORE_CODE WHERE BOOK_ID = $1;
        `,
    ADD_BOOK_QUERY:
        "INSERT INTO BOOKS_MANGEMENT_SYSTEM.BOOK (BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUPLISHER, BOOK_PAGES, STORE_CODE, CREATED_ON, CREATED_BY) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
    UPDATE_BOOK_QUERY:
        "UPDATE BOOKS_MANGEMENT_SYSTEM.BOOK SET BOOK_TITLE= $1 , BOOK_DESCRIPTION= $2, BOOK_AUTHOR= $3, BOOK_PUPLISHER= $4, BOOK_PAGES= $5, STORE_CODE= $6, CREATED_ON= $7, CREATED_BY= $8 WHERE BOOK_ID= $9",
    DELETE_BOOK_QUERY:
        "DELETE FROM BOOKS_MANGEMENT_SYSTEM.BOOK WHERE BOOK_ID = $1",
    SELECT_BOOK_ID_QUERY:
        "SELECT BOOK_ID FROM BOOKS_MANGEMENT_SYSTEM.BOOK WHERE BOOK_ID = $1",
    AUDIT_INSERT_QUERY:
        "INSERT INTO BOOKS_MANGEMENT_SYSTEM.APP_AUDIT (AUDIT_ACTION, AUDIT_DATA, AUDIT_STATUS, AUDIT_ERROR, AUDIT_BY, AUDIT_ON) VALUES($1, $2, $3, $4, $5, $6)",
    GET_USER_LIST_QUERY: `SELECT USER_ID, USERNAME, EMAIL, USER_TYPE_CODE, FULL_NAME, ACTIVE FROM BOOKS_MANGEMENT_SYSTEM.APP_USER `,
    ADD_USER_QUERY: `INSERT INTO BOOKS_MANGEMENT_SYSTEM.APP_USER
    (USERNAME, SECRETWORD, EMAIL, USER_TYPE_CODE, FULL_NAME, CREATED_ON, CREATED_BY)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning user_id`,
    IS_USER_EXISTS_QUERY: `SELECT COUNT(USER_ID) FROM BOOKS_MANGEMENT_SYSTEM.APP_USER WHERE LOWER(USERNAME) = LOWER($1) OR LOWER(EMAIL) = LOWER($2)`,
    LOGIN_QUERY: `SELECT USER_ID, USERNAME, secretword, EMAIL, USER_TYPE_CODE, FULL_NAME, ACTIVE FROM BOOKS_MANGEMENT_SYSTEM.APP_USER WHERE LOWER(USERNAME) = LOWER($1) AND ACTIVE = 1`,
};
