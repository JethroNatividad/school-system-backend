import { Router } from 'express';
import {
	getTodos,
	createTodos,
	updateTodos,
	getTodo,
	deleteTodos,
} from '../controllers/todoController';
export const todoRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *          - text
 *       properties:
 *         text:
 *           type: string
 *           description: Todo text.
 *           example: Feed cat
 *         completed:
 *           type: boolean
 *           description: Is todo completed.
 *           example: true
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve a list of Todos
 *     description: Retrieve a list of todos. Can be used to populate a list of fake todos when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Todo'
 *
 *   post:
 *     summary: Create a todo
 *     description: Create a todo
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '201':
 *         description: Todo Created
 *         content:
 *           application/json:
 *             required: true
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      $ref: '#/components/schemas/Todo'
 *
 * /api/todos/{todoId}:
 *   get:
 *     summary: Retrieve a todo by Id
 *     description: Retrieve a todo by Id
 *     parameters:
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      $ref: '#/components/schemas/Todo'
 *
 *   put:
 *     summary: Update a todo
 *     description: Update a todo
 *     parameters:
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *           required: true
 *     responses:
 *       '200':
 *         description: Todo Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                  data:
 *                      $ref: '#/components/schemas/Todo'
 *
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo
 *     parameters:
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Todo Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 */

todoRouter.get('/', getTodos);
todoRouter.post('/', createTodos);
todoRouter.get('/:id', getTodo);
todoRouter.put('/:id', updateTodos);
todoRouter.delete('/:id', deleteTodos);
