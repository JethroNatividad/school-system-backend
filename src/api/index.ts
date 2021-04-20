import express, { Application } from 'express';
import { todoRouter } from './routes/';
import { SwaggerOptions } from 'swagger-ui-express';
import SwaggerJsDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';

const api: Application = express();
// You may add api specific middlewares here

/* Swagger */
const swaggerOptions: SwaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Node Express Typescript Swagger Starter',
			description: 'Node Express Typescript Swagger Starter',
			license: {
				name: 'Licensed Under MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
			servers: [
				{
					url: 'http://localhost:8000',
					description: 'Development Servre',
				},
			],
		},
	},
	apis: ['dist/**/*.js'],
};
api.use('/docs', SwaggerUI.serve);
api.use('/docs', SwaggerUI.setup(SwaggerJsDoc(swaggerOptions)));
/* Swagger */

// express middleware handling the body parsing
api.use(express.json());

// express middleware handling the form parsing
api.use(express.urlencoded({ extended: false }));

api.use('/todos', todoRouter);

export default api;
