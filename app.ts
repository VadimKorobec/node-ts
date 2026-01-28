import express from "express";

import todosRoutes from "./routes/todos";

const app = express();

app.use(express.json());

app.use("/api", todosRoutes);

app.listen({ port: 3000 });
