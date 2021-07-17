import express from "express";
import router from "./routes/routes";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const PORT = process.env.PORT || 5000;

const app = express();

// set cache headers for all requests
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const cacheSeconds = 500;
  // Only cache GET requests
  if (req.method === "GET") {
    res.set("Cache-control", `public, max-age=${cacheSeconds}`);
  } else {
    // No caching for other methods
    res.set("Cache-control", `no-store`);
  }
  // pass on the request
  next();
});

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

export default server;