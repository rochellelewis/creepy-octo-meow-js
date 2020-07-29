/**
 * Validates and sanitizes data for updating a user Profile
 **/
export const profileValidator = {
	profileId: {
		isUUID: {
			errorMessage: 'profile id is invalid'
		},
		trim: true,
		in: ["params"]
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
	},
	profilePasswordConfirm: {
		isLength: {
			errorMessage: 'Password confirmation must be at least eight characters',
			options: {min: 8}
		},
		trim: true,
		escape: true,
		custom: {
			options: (value: string, {req}: any) => {
				if(value !== req.body.profilePassword) {
					throw new Error("Passwords do not match :(")
				} else {
					return value
				}
			}
		}
	}
};

export const profileIdValidator = {
	profileId: {
		isUUID: {
			errorMessage: "please provide a valid profile id"
		},
		trim: true
	}
}