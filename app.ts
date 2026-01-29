import express from "express";
import todosRoutes from "./routes/todos";

const app = express();

app.use(express.json());

app.use("/api", todosRoutes);

app.listen(3000, () => {
  console.log("Example app listining on port 3000!");
});
