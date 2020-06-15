/**
 * Validates and sanitizes like data from the front end
 **/
export const likeValidator = {
	likePostId: {
		isUUID: {
			errorMessage: 'post id is invalid'
		}
	},
	likeProfileId: {
		isUUID: {
			errorMessage: 'profile id is invalid'
		}
	}
};