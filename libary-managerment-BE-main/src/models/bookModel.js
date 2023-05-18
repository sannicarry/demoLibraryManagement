import pool from "../configs/connectDb";


const Book = class {
    constructor(id, name, genreId, author, publication, quantity) {
        this.id = id;
        this.name = name;
        this.genreId = genreId;
        this.author = author;
        this.publication = publication;
        this.quantity = quantity;
    }
    /* phải có static hàm này vì muốn method này phải là method tĩnh,
        khi không khởi tạo đối tượng nó vẫn phương thức của class */
    static async getBookList() {
        const [bookData] = await pool.execute('SELECT * FROM book');
        return bookData;
    }

    static async findById(id) {
        const [book] = await pool.execute('SELECT * FROM book WHERE book_id = ?', [id]);
        return book[0];
    }

    static async createNewBook(name, genreId, author, publication, quantity) {
        const [result] = await pool.execute(`INSERT INTO book( book_name, genre_id, author, publication, quantity)
                                            VALUES (?, ?, ?, ?, ?);`, [name, genreId, author, publication, quantity]);
        return new Book(result.insertId, name, genreId, author, publication, quantity);
    }

    static async deleteBook(id) {
        await pool.execute('DELETE FROM book WHERE book_id = ?', [id]);
        return;
    }

    static async updateBook(id, name, genreId, author, publication, quantity) {
        await pool.execute(`UPDATE book 
                SET book_name = ?, genre_id = ?, author = ?, publication = ?, quantity = ? WHERE book_id = ? `,
            [name, genreId, author, publication, quantity, id]);
        return new Book(id, name, genreId, author, publication, quantity);
    }
}


export default Book;
