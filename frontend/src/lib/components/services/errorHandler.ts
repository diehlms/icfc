interface ErrorObject {
	field: string;
	messages: string[];
}

interface FormattedError {
	field: string;
	messages: string;
}

type ApiErrorResponse = Array<[string, ErrorObject]>;

export function processApiErrorsToString(errorBody: ErrorObject | ApiErrorResponse): string {
	const formattedErrors: FormattedError[] = [];
	if (Array.isArray(errorBody)) {
		errorBody.forEach((error) => {
			for (const [field, messages] of Object.entries(error)) {
				formattedErrors.push({
					field: field,
					messages: messages.join(',')
				});
			}
		});

		const errorMessages = formattedErrors.map((formattedError) => {
			return `${formattedError.field} ${formattedError.messages}`;
		});
		return errorMessages.join(', ');
	} else {
		for (const [field, messages] of Object.entries(errorBody)) {
			formattedErrors.push({
				field: field,
				messages: messages
			});
		}
		return `${formattedErrors[0].field} ${formattedErrors[0].messages}`;
	}
}
