/**
 * Validates and sanitizes data for updating a user Profile
 **/
export const profileValidator = {
	profileId: {
		isUUID: {
			errorMessage: 'profile id is invalid'
		}
	},
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
	}
};