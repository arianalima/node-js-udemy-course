const mongoose = require('mongoose');
var validator = require('validator');

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('invalid email');
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"');
			}
		}
	},
	age: {
		type: Number,
		default: undefined,
		validate(value) {
			if (value < 0) {
				throw new Error('invalid age');
			}
		}
	}
});

module.exports = User;
