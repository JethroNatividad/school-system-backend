import Joi from 'joi';
import { IUser } from '../models/User';

export const validateSignup = (data: IUser) => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string(),
		isModerator: Joi.number(),
		role: Joi.number(),
		email: Joi.string().required().min(6).email(),
		password: Joi.string().required().min(6),
	});
	return schema.validate(data);
};

export const validateSignin = (data: IUser) => {
	const schema = Joi.object({
		email: Joi.string().required().min(6).email(),
		password: Joi.string().required().min(6),
	});
	return schema.validate(data);
};
