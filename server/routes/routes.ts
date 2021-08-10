import express from 'express';
import controller from '../controllers/controller';

const routes = express.Router();

routes.get('/list.json', controller.listIconsJSON);

routes.get('/*', controller.getBadge);

routes.post('/', controller.postIcon);

export default routes;
