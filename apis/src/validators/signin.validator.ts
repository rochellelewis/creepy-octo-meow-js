/**
 * Validates and sanitizes sign in data from end user
 **/
export const signinValidator = {
	profilePassword: {
		isLength: {
			errorMessage: 'Password must be at least eight characters',
			options: { min: 8 }
		},
		trim: true,
		escape: true
	},
	profileEmail: {
		isEmail: {
			errorMessage: 'Please provide a valid email'
		},
		normalizeEmail: true,
		trim: true
	}
};