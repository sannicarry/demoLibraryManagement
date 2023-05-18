import Book from "../models/bookModel";

const getBookList = async (req, res) => {
    try {
        const books = await Book.getBookList();
        return res.status(200).json({
            message: 'Lấy danh sách thành công!',
            data: books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const createNewBook = async (req, res) => {
    try {
        let { book_name, genre_id, author, publication, quantity } = req.body;
        if (!book_name || !genre_id || !author || !publication || !quantity) {
            return res.status(400).json({
                message: "Thiếu các trường cần truyên vào!"
            })
        }
        const bookCreated = await Book.createNewBook(book_name, genre_id, author, publication, quantity);
        return res.status(200).json({
            message: `Đã thêm sách có id là ${bookCreated.id}`,
            bookCreated: bookCreated
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }


}

const deleteBook = async (req, res) => {
    try {
        let { id } = req.params;
        let book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                message: `Không tìm thấy sách có id = ${id}`
            });
        }
        await Book.deleteBook(id);
        return res.status(200).json({
            message: `Xóa thành công sách có id = ${id}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateBook = async (req, res) => {
    try {
        let { book_id, book_name, genre_id, author, publication, quantity } = req.body;
        let book = await Book.findById(book_id);

        if (!book) {
            return res.status(404).json({
                message: `Không tìm thấy sách có id = ${id}`
            });
        }
        let bookUpdated = await Book.updateBook(book_id, book_name, genre_id, author, publication, quantity);
        return res.status(200).json({
            message: `Sửa thành công sách có id = ${book_id}`,
            bookUpdated: bookUpdated
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getBookList, createNewBook, deleteBook, updateBook
}