import express from "express";
import configViewEngine from "./configs/configViewEngines";
import initWebRouter from './routers/webRouter'
import initBookRouter from './routers/bookRouter';
import initGenreRouter from './routers/genreRouter';
import initLibrarianRouter from './routers/librarianRouter';
import initLoginRouter from "./routers/loginRouter";

const app = express();
const port = process.env.PORT || 8080;

// cấu hình midleware
configViewEngine(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




initLoginRouter(app);
initWebRouter(app);
initBookRouter(app);
initGenreRouter(app);
initLibrarianRouter(app);




app.listen(port, () => {
    console.log(`Server link is localhost:${port}`)
})