/**
 * Validates the profile activation token for account activation
 **/
export const activationValidator = {
	activation: {
		trim: true,
		isHexadecimal: {
			errorMessage: 'activation token is not valid'
		},
		custom: {
			options: (value:string) => {
				if (value.length === 0 || value === "") {
					throw new Error("activation token cannot be empty")
				} else {
					return value
				}
			}
		}
	}
};