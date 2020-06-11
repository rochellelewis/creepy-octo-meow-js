/**
 * Validates and sanitizes post data from the end user
 **/
export const postValidator = {
	postProfileId: {
		isUUID: {
			errorMessage: 'postProfileId is invalid'
		}
	},
	postContent: {
		isLength: {
			errorMessage: 'Meow is too long! Limit it to 2000 characters pls.',
			options: { max: 2000 }
		},
		trim: true,
		escape: true
	},
	postTitle: {
		isLength: {
			errorMessage: 'Title is too long! Limit it to 64 chars pls.'
		},
		trim: true,
		escape: true
	},
	postDate: {
		toDate: true
	}
};