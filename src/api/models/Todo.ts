import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
	text: string;
	completed: boolean;
}

const todoSchema = new Schema({
	text: {
		type: String,
	},
	completed: {
		type: Boolean,
	},
});

export default model<ITodo>('Todo', todoSchema);
