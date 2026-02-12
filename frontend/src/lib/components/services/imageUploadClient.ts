export class ImageUploadClient {
	private baseUrl: string;
	private token: string;

	constructor(baseUrl: string, token: string) {
		this.baseUrl = baseUrl;
		this.token = token;
	}

	/**
	 * Upload an image with additional data (caption, user_id).
	 *
	 * @param endpoint The API endpoint to POST the image to (e.g., '/v1/galleries').
	 * @param imageFile The image file to upload.
	 * @param caption The caption for the image.
	 * @param userId The ID of the user.
	 * @returns A promise with the server response.
	 */
	public async uploadImage(endpoint: string, formData: any, method: string = 'POST'): Promise<any> {
		const url = `${this.baseUrl}${endpoint}`;

		const response = await fetch(url, {
			method: method,
			headers: {
				Authorization: `Bearer ${this.token}`
			},
			body: formData
		});

		if (!response.ok) {
			throw new Error(`Failed to upload image: ${response.statusText}`);
		}

		return response.json();
	}
}
