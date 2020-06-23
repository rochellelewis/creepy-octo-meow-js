/**
 * Validates and sanitizes sign in data from end user
 **/
export const signInValidator = {
	signinPassword: {
		isLength: {
			errorMessage: 'Password must be at least eight characters',
			options: { min: 8 }
		},
		trim: true,
		escape: true
	},
	signinEmail: {
		isEmail: {
			errorMessage: 'Please provide a valid email'
		},
		normalizeEmail: true,
		trim: true
	}
};