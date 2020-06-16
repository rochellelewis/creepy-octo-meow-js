/**
 * Validates and sanitizes sign up data from end user
 **/
export const signUpValidator = {
	profileUsername: {
		escape: true,
		trim: true,
		isLength: {
			errorMessage: 'Username must be between seven and thirty two characters',
			options: { min: 7, max: 32 }
		}
	},
	profileEmail: {
		isEmail: {
			errorMessage: 'Please provide a valid email'
		},
		normalizeEmail: true,
		trim: true
	},
	profilePassword: {
		isLength: {
			errorMessage: 'Password must be at least eight characters',
			options: { min: 8 }
		},
		trim: true,
		escape: true
	},
	profilePasswordConfirm: {
		isLength: {
			errorMessage: 'Password must be at least eight characters',
			options: { min: 8 }
		},
		trim: true,
		escape: true
		// todo: get password match functionality to work
		// custom: {
		// 	options: (value:string, {req}) => {
		// 		if (value !== req.body.profilePasswordConfirm) {
		// 			throw new Error("Passwords do not match")
		// 		} else {
		// 			return true
		// 		}
		// 	}
		// }
	}
};