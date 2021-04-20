import { Request, Response } from 'express';
export const getPersons = (req: Request, res: Response) => {
	res.send({
		persons: ['Joseph', 'Ceasar', 'Dio'],
	});
};
