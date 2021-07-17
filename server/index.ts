import express from "express";
import router from "./routes/routes";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

export default server;