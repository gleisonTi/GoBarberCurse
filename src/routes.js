import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionCotroller from './app/controllers/SessionCotroller';
import AuthMiddleware from './app/middlewares/auth';


const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionCotroller.store);

routes.use(AuthMiddleware); // middleware aplicado somente para as rotas anteriores
routes.put('/users', UserController.update);
routes.post('/files', uploads.single('file'), (req, res) => res.json({ ok: true }));

export default routes;
