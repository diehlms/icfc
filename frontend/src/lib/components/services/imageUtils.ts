import { PUBLIC_ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';

export const hotSwapProductionUris = (origUri: string): string => {
	return PUBLIC_ENVIRONMENT === 'production' || PUBLIC_ENVIRONMENT === 'staging'
		? origUri
		: PUBLIC_BASE_URL + origUri;
};
