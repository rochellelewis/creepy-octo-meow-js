/**
 * Validates and sanitizes post data from the end user
 **/
export const postValidator = {
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
			errorMessage: 'Title is too long! Limit it to 64 chars pls.',
			options: { max: 64 }
		},
		trim: true,
		escape: true
	}
};