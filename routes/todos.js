"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let todos = [];
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: "first todo",
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo", todo: newTodo, todos: todos });
});
router.put("/todo/:id", (req, res, next) => {
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
router.delete("/todo/:id", (req, res, next) => {
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
