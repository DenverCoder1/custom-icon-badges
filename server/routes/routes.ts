import express from 'express';
import controller from '../controllers/controller';

const routes = express.Router();

routes.get('/*', controller.getBadge);

routes.post('/', controller.postIcon);

export default routes;
