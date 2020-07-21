/**
 * Validates and sanitizes post data from the end user
 **/
export const postValidator = {
	postContent: {
		isLength: {
			errorMessage: 'Meow is too long! Limit it to 300 characters pls.',
			options: { max: 300 }
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

export const postIdValidator = {
	postId: {
		isUUID: {
			errorMessage: "please provide a valid post id"
		},
		trim: true,
		in: ["params"]
	}
}

export const putPostValidator = {
	...postIdValidator,
	...postValidator
}