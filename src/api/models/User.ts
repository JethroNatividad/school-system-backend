import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	hashedPassword: string;
	isModerator: string;
	role: string;
	isDeleted: string;
	_doc: any;
	validPassword(password: string): boolean;
}

const userSchema: Schema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		isModerator: {
			type: Number,
			default: 0,
		},
		role: {
			type: Number,
			default: 0,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);
userSchema
	.virtual('password')
	.set(function (this: IUser, password: string) {
		this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	})
	.get(() => {});
userSchema.methods.validPassword = function (this: any, password: string) {
	return bcrypt.compareSync(password, this.hashedPassword);
};

export default model<IUser>('User', userSchema);
