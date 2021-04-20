import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
	try {
		const todos: ITodo[] = await Todo.find({}).exec();
		res.status(200).send({
			data: todos,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: 'Something went wrong',
		});
	}
};
export const createTodos = async (req: Request, res: Response) => {
	const { text, completed } = req.body;
	const todo = new Todo({ text, completed });
	try {
		const newTodo = await todo.save();
		const { _id, text, completed } = newTodo;
		res.status(201).send({
			message: 'Todo created',
			data: { id: _id, text, completed },
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: 'Something went wrong',
		});
	}
};
export const updateTodos = async (req: Request, res: Response) => {
	const todoId = req.params.id;
	const { text, completed } = req.body;
	try {
		const todo = await Todo.findByIdAndUpdate(todoId, { text, completed });
		if (todo === null) {
			return res.status(404).send({
				message: 'Todo not found',
			});
		}
		res.status(200).send({
			message: 'Todo updated',
			data: { id: todoId, text, completed },
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: 'Something went wrong',
		});
	}
};
export const getTodo = async (req: Request, res: Response) => {
	const todoId = req.params.id;
	try {
		const todo = await Todo.findById(todoId);
		if (todo === null) {
			return res.status(404).send({
				message: 'Todo not found',
			});
		}
		const { _id, text, completed } = todo;
		res.status(200).send({
			data: { id: _id, text, completed },
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: 'Something went wrong',
		});
	}
};
export const deleteTodos = async (req: Request, res: Response) => {
	const todoId = req.params.id;
	try {
		const todo = await Todo.findByIdAndDelete(todoId);
		if (todo === null) {
			return res.status(404).send({
				message: 'Todo not found',
			});
		}
		res.status(200).send({
			message: 'Todo deleted',
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: 'Something went wrong',
		});
	}
};
