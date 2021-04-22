import { Router } from 'express';
import { signup } from '../controllers/authController';
export const authRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - firstName
 *          - email
 *          - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name.
 *           example: John
 *         lastName:
 *           type: string
 *           description: Last name.
 *           example: Doe
 *         email:
 *           type: string
 *           description: Valid email.
 *           example: johndoe.com
 *         password:
 *           type: string
 *           description: Password.
 *           example: Password123!
 *         isModerator:
 *           type: number
 *           description: is moderator.
 *           example: 0
 *         role:
 *           type: number
 *           description: role.
 *           example: 0
 */

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: User signup
 *    description: User signup
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '201':
 *        description: Success
 *        content:
 *          application/json:
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *               user:
 *                $ref: '#/components/schemas/User'
 *
 */

authRouter.post('/signup', signup);
