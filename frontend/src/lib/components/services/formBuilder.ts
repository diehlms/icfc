import type { SelectOptionType } from 'flowbite-svelte/dist/types';

export enum FormTypes {
	text = 'text',
	number = 'number',
	checkbox = 'checkbox',
	select = 'select',
	password = 'password',
	richText = 'richText',
	attachment = 'attachment',
	dateTime = 'dateTime'
}

export class FormInput {
	constructor(
		public name: string,
		public type: FormTypes,
		public defaultBoolVal?: boolean,
		public uneditable?: boolean,
		public value?: any,
		public error?: string,
		public selectOptions?: SelectOptionType[]
	) {}
}

class FormBuilder {
	private formInputs: FormInput[] = [];

	constructor() {}

	name(valueOverride?: string): FormBuilder {
		this.formInputs.push(new FormInput(valueOverride ? valueOverride : 'name', FormTypes.text));
		return this;
	}

	title(): FormBuilder {
		this.formInputs.push(new FormInput('title', FormTypes.text))
		return this;
	}

	location(): FormBuilder {
		this.formInputs.push(new FormInput('location', FormTypes.text))
		return this;
	}

	content(): FormBuilder {
		this.formInputs.push(new FormInput('content', FormTypes.richText))
		return this;
	}

	attachment(): FormBuilder {
		this.formInputs.push(new FormInput('attachment', FormTypes.attachment))
		return this;
	}

	fromLocation(): FormBuilder {
		this.formInputs.push(new FormInput('fromLocation', FormTypes.select))
		return this;
	}

	toLocation(): FormBuilder {
		this.formInputs.push(new FormInput('toLocation', FormTypes.select))
		return this;
	}

	offering(): FormBuilder {
		this.formInputs.push(new FormInput('offering', FormTypes.checkbox))
		return this;
	}

	numberOfPassengers(): FormBuilder {
		this.formInputs.push(new FormInput('numberOfPassengers', FormTypes.number))
		return this;
	}

	fromDate(): FormBuilder {
		this.formInputs.push(new FormInput('fromDate', FormTypes.dateTime));
		return this;
	}

	toDate(): FormBuilder {
		this.formInputs.push(new FormInput('toDate', FormTypes.dateTime));
		return this;
	}

	email(): FormBuilder {
		this.formInputs.push(new FormInput('email', FormTypes.text));
		return this;
	}

	phoneNumber(): FormBuilder {
		this.formInputs.push(new FormInput('phoneNumber', FormTypes.number | FormTypes.text));
		return this;
	}

	enabled(): FormBuilder {
		this.formInputs.push(new FormInput('enabled', FormTypes.checkbox));
		return this;
	}

	password(): FormBuilder {
		this.formInputs.push(new FormInput('password', FormTypes.password));
		return this;
	}

	build(data?: any): FormInput[] {
		if (data === undefined) {
			// blank form
			return this.formInputs;
		} else {
			this.formInputs.forEach((input) => {
				if (data[input.name] !== undefined) {
					input.value = data[input.name];
				}
			});
			return this.formInputs;
		}
	}
}

export default FormBuilder;
