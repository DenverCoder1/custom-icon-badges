import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import router from './routes/routes';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const PORT = process.env.PORT || 5000;

const app = express();

app.set('trust proxy', 1);

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

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

export default server;
