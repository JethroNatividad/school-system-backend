import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import { validateSignup, validateSignin } from '../validation/authValidation';

export const signup = async (req: Request, res: Response) => {
	const { error } = validateSignup(req.body);
	if (error)
		return res.status(422).json({
			error: error.message,
		});

	const emailExist: IUser | null = await User.findOne({
		email: req.body.email,
	});
	if (emailExist) {
		return res.status(400).json({
			error: 'Email already exists',
		});
	}
	try {
		const newUser = await new User(req.body);
		newUser.save();
		res.status(201).json({
			message: 'User created',
			user: { ...newUser._doc, hashedPassword: null },
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: 'Something went wrong',
		});
	}

	// try {
	// 	const todos: ITodo[] = await Todo.find({}).exec();
	// 	res.status(200).send({
	// 		data: todos,
	// 	});
	// } catch (error) {
	// 	console.log(error);
	// 	res.status(500).send({
	// 		error: 'Something went wrong',
	// 	});
	// }
};
