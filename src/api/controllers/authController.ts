import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import { validateSignup, validateSignin } from '../validation/authValidation';
require('dotenv').config();

export const signup = async (req: Request, res: Response) => {
	const { error } = validateSignup(req.body);
	if (error)
		return res.status(400).json({
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
};
export const signin = async (req: Request, res: Response) => {
	const { error } = validateSignin(req.body);
	if (error)
		return res.status(400).json({
			error: error.message,
		});

	const emailExist: IUser | null = await User.findOne({
		email: req.body.email,
	});

	if (!emailExist) {
		return res.status(400).json({
			error: 'Email does not have an account',
		});
	}

	const validPass = emailExist.validPassword(req.body.password);

	if (!validPass)
		return res.status(400).json({
			error: 'Invalid Password',
		});

	const { _id, firstName, lastName } = emailExist;
	const secretKey = process.env.JWTSECRET;

	if (!secretKey) {
		return res.status(500).send({
			error: 'Something went wrong',
		});
	}

	const token = jwt.sign({ _id: _id, firstName, lastName }, secretKey);
	return res.status(200).json({
		token,
		user: { ...emailExist._doc, hashedPassword: undefined },
	});
};

export const requireSignIn = expressJwt({
	userProperty: 'user',
	secret: process.env.JWTSECRET || '',
	algorithms: ['HS256'],
});
