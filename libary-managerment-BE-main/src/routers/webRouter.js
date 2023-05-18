import express from "express";
import homeController from '../controllers/homeController';


const router = express.Router();

const initWebRouter = (app) => {
    router.get('/login', homeController.getLoginPage);
    // router.post('/', loginController.handleLogin);
    return app.use('/', router);
}


export default initWebRouter;