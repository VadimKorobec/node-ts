import express, { Request, Response } from "express";
import { Todo } from "../models/todo";

let todos: Todo[] = [];

const router = express.Router();

router.get("/", (req: Request, res: Response, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todos", (req: Request, res: Response, next) => {
  const { text } = req.body;

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text,
  };

  todos.push(newTodo);

  res.status(201).json({ message: "Added Todo", todos: todos });
});

router.put("/todos/:id", (req: Request, res: Response, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res
      .status(404)
      .json({ message: "Could not find todo for this id." });
  }

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  todo.text = text;
  return res.status(200).json({ message: "Updaded todo", todos: todos });
});

router.delete("/todos/:id", (req: Request, res: Response, next) => {
  const { id } = req.params;
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res
      .status(404)
      .json({ message: "Could not find todo for this id." });
  }

  todos = todos.filter((item) => item.id !== id);
  return res.status(200).json({ message: "Todo was deleted", todos });
});

export default router;
