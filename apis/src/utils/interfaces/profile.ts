export interface Profile {
	profileId: string | null,
	profileActivationToken: string | null,
	profileEmail: string,
	profileHash: string,
	profileUsername: string
}