import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(3001, () => {
  console.log("Backend is running on http://localhost:3001");
});
