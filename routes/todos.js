"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/todos", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.get("/todos/:id", (req, res, next) => {
    const { id } = req.params;
    const todo = todos.find((item) => item.id === id);
    if (!todo) {
        return res.status(404).json({ message: 'Sorry we dont have this todo with that id!' });
    }
    res.status(200).json({ todo });
});
router.post("/todos", (req, res, next) => {
    const { text } = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo", todos: todos });
});
router.put("/todos/:id", (req, res, next) => {
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
router.delete("/todos/:id", (req, res, next) => {
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
exports.default = router;
