import express from "express";
import genreController from '../controllers/genreController';

const router = express.Router();


const initGenreRouter = (app) => {
    router.get('/genre/list', genreController.getGenreList);

    return app.use('/api/v1', router);
}

export default initGenreRouter;