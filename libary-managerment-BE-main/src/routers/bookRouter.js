import express from 'express';
import bookController from '../controllers/bookController'

const router = express.Router();

const initBookRouter = (app) => {
    router.get('/book/list', bookController.getBookList);
    router.post('/book/create-book', bookController.createNewBook);
    router.delete('/book/delete-book/:id', bookController.deleteBook);
    router.patch('/book/update-book', bookController.updateBook);
    return app.use('/api/v1', router);
}

export default initBookRouter;