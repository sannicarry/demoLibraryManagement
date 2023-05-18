import express from 'express';
import librarianController from '../controllers/librarianController';
const router = express.Router();


const initLibrarianRouter = (app) => {
    router.get('/librarian/detail', librarianController.getLibrarianDetail);

    return app.use('/api/v1', router);
}


export default initLibrarianRouter;