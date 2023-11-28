import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import router from './routes/routes.js';

dotenv.config({ path: path.resolve('..', '.env') });

const PORT = process.env.PORT ?? 5000;
const BUILD_PATH = path.resolve('..', 'build');

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.static(BUILD_PATH));
app.use(router);

// set rate limit on post requests
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // max 10 requests per windowMs
  message: JSON.stringify({
    type: 'error',
    message: 'Too many requests, please try again later.',
  }),
});
app.post('/', apiLimiter);

// set cache headers for all requests
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const cacheSeconds = 500;
  // Only cache GET requests
  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${cacheSeconds}`);
  } else {
    // No caching for other methods
    res.set('Cache-control', 'no-store');
  }
  // pass on the request
  next();
});

const server = app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

// Display the react app on the root path
app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

export default server;
