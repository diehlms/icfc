import { PUBLIC_UPLOADS_S3_BUCKET, PUBLIC_ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';

export const hotSwapProductionUris = (origUri: string): string => {
	if (PUBLIC_ENVIRONMENT === 'production') {
		return `https://${PUBLIC_UPLOADS_S3_BUCKET}.amazonaws.s3.com${origUri}`;
	} else {
		return PUBLIC_BASE_URL + origUri;
	}
};
